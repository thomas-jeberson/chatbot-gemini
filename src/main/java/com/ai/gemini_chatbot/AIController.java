package com.ai.gemini_chatbot;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@RestController
@AllArgsConstructor
@RequestMapping("/api/qna")
public class AIController {

    private final QnAService qnAService;

    @PostMapping("/ask")
    public ResponseEntity<String>askQuestion(@RequestBody Map<String,String> payload){
        String question=payload.get("question");
        String answer=qnAService.getAnswer(question);
        return ResponseEntity.ok(answer);
    }
}
