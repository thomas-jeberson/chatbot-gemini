package com.ai.cutsomized_chatbot.controller;

import com.ai.cutsomized_chatbot.dao.ChatMessageRepository;
import com.ai.cutsomized_chatbot.dao.UserRepository;
import com.ai.cutsomized_chatbot.entity.ChatHistoryEntity;
import com.ai.cutsomized_chatbot.entity.UserEntity;
import com.ai.cutsomized_chatbot.service.QnAService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "thomaschatbot.netlify.app")
@RestController
@RequestMapping("/api/qna")
public class AIController {

    private final QnAService qnaService;
    private final ChatMessageRepository chatRepo;
    private final UserRepository userRepo;

    public AIController(QnAService qnaService, ChatMessageRepository chatRepo, UserRepository userRepo) {
        this.qnaService = qnaService;
        this.chatRepo = chatRepo;
        this.userRepo = userRepo;
    }

    // ✅ Step 3: Use the field
    @PostMapping("/ask")
    public Map<String, Object> askQuestion(@RequestBody Map<String, String> body, Authentication authentication) {
        String question = body.get("question");
        String sessionId = body.get("sessionId");
        System.out.println(authentication.getName());
        return qnaService.getAnswer(question, sessionId,authentication);
    }

    @GetMapping("/history/{sessionId}")
    public List<ChatHistoryEntity> getChatHistory(
            @PathVariable String sessionId,
            Authentication authentication) {

        String username = authentication.getName();
        UserEntity user = userRepo.findByUserName(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return chatRepo.findByUserAndSessionIdOrderByTimestampAsc(user, sessionId);
    }
}
