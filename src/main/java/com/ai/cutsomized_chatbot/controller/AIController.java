package com.ai.cutsomized_chatbot.controller;

import com.ai.cutsomized_chatbot.service.QnAService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/qna")
public class AIController {

    // ✅ Step 1: Declare the field
    private final QnAService qnaService;

    // ✅ Step 2: Constructor injection
    public AIController(QnAService qnaService) {
        this.qnaService = qnaService;
    }

    // ✅ Step 3: Use the field
    @PostMapping("/ask")
    public Map<String, Object> askQuestion(@RequestBody Map<String, String> body) {
        String question = body.get("question");
        String sessionId = body.get("sessionId");
        return qnaService.getAnswer(question, sessionId);
    }
}
