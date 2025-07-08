package com.ai.cutsomized_chatbot.service;

import com.ai.cutsomized_chatbot.dao.ChatMessageRepository;
import com.ai.cutsomized_chatbot.entity.ChatHistoryEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class QnAService {

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final WebClient webClient;
    private final ChatMessageRepository chatRepo;

    public QnAService(WebClient.Builder builder, ChatMessageRepository chatRepo) {
        this.webClient = builder.baseUrl("https://generativelanguage.googleapis.com").build();
        this.chatRepo = chatRepo;
    }

    public Map<String, Object> getAnswer(String question, String sessionId) {
        // Validate input
        if (question == null || question.isBlank()) {
            throw new IllegalArgumentException("Question cannot be empty");
        }

        // Save user message
        ChatHistoryEntity userMessage = new ChatHistoryEntity();
        userMessage.setSessionId(sessionId);
        userMessage.setSender("user");
        userMessage.setMessage(question);
        userMessage.setTimestamp(LocalDateTime.now());
        chatRepo.save(userMessage);

        // Fetch conversation history
        List<ChatHistoryEntity> history = chatRepo.findBySessionIdOrderByTimestampAsc(sessionId);

        // Prepare conversation context
        List<Map<String, Object>> contents = new ArrayList<>();

        // System prompt
        contents.add(Map.of(
                "role", "user",  // Gemini might expect "user" for initial prompt
                "parts", List.of(
                        Map.of("text", "You are a helpful AI chatbot created by Thomas Jeberson an 3rd Year Cse student. if you are asked anything other than thats related to computer science and tech reply thomas didnt program to answer these kind of question. make sure whatever reply you give doesnt exceed 4000 characters strictly. also the answers you are going to give need to be direct and shortest possible. only if the user ask you explain in detail again, you can go upto 4000 characters otherwise direct answer")
                )
        ));

        // Add conversation history (last 20 messages)
        int limit = Math.min(history.size(), 20);
        List<ChatHistoryEntity> recentHistory = history.subList(Math.max(history.size() - limit, 0), history.size());

        for (ChatHistoryEntity msg : recentHistory) {
            if (msg.getMessage() != null && !msg.getMessage().isBlank()) {
                contents.add(Map.of(
                        "role", msg.getSender(),
                        "parts", List.of(Map.of("text", msg.getMessage()))
                ));
            }
        }

        // Add current question
        contents.add(Map.of(
                "role", "user",
                "parts", List.of(Map.of("text", question))
        ));

        // Build request
        Map<String, Object> requestBody = Map.of("contents", contents);

        // Call Gemini API
        String path = "/v1beta/models/gemini-2.0-flash:generateContent?key=" + geminiApiKey;
        Map<String, Object> geminiResponse = new HashMap<>();
        String replyText = "Sorry, I couldn't process your request.";

        try {
            geminiResponse = webClient.post()
                    .uri(path)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestBody)
                    .retrieve()
                    .onStatus(status -> status.isError(), response -> {
                        return response.bodyToMono(String.class)
                                .flatMap(body -> Mono.error(new RuntimeException(
                                        "API Error: " + response.statusCode() + " - " + body)));
                    })
                    .bodyToMono(Map.class)
                    .block();

            // Extract response
            if (geminiResponse != null) {
                replyText = extractResponseText(geminiResponse);
            }
        } catch (Exception ex) {
            replyText = "Sorry, I encountered an error processing your request.";
        }

        // Save bot reply
        ChatHistoryEntity botReply = new ChatHistoryEntity();
        botReply.setSessionId(sessionId);
        botReply.setSender("model");
        botReply.setMessage(replyText);
        botReply.setTimestamp(LocalDateTime.now());
        chatRepo.save(botReply);

        return geminiResponse != null ? geminiResponse : Map.of("error", "No response from API");
    }

    private String extractResponseText(Map<String, Object> response) {
        try {
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
            if (candidates != null && !candidates.isEmpty()) {
                Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
                List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                if (parts != null && !parts.isEmpty()) {
                    return (String) parts.get(0).get("text");
                }
            }
        } catch (Exception e) {
            System.err.println("Error extracting response: " + e.getMessage());
        }
        return "Sorry, I couldn't understand the response.";
    }
}
