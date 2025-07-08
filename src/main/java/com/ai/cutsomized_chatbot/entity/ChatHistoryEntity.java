package com.ai.cutsomized_chatbot.entity;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "chat_history")
public class ChatHistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long Id;

    @Column(name="session_id")
    private String sessionId;

    @Column(name="sender")
    private String sender;

    @Column(name="message",length = 5000)
    private String message;

    @Column(name="timestamp")
    private LocalDateTime timestamp;

    public ChatHistoryEntity(String sessionId, String sender, String message, LocalDateTime timeStamp) {
        this.sessionId = sessionId;
        this.sender = sender;
        this.message = message;
        this.timestamp = timeStamp;
    }

    @Transactional
    public void setId(Long id) {
        Id = id;
    }

    @Transactional
    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    @Transactional
    public void setMessage(String message) {
        this.message = message;
    }

    @Transactional
    public void setSender(String sender) {
        this.sender = sender;
    }

    @Transactional
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
