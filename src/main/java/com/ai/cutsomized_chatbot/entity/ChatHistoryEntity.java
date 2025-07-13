package com.ai.cutsomized_chatbot.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "chat_history")
public class ChatHistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="session_id")
    private String sessionId;

    @Column(name="sender")
    private String sender;

    @Column(name="message",length = 5000)
    private String message;

    @Column(name="timestamp")
    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name="user_id")
    private UserEntity user;

    public ChatHistoryEntity(UserEntity user, LocalDateTime timestamp, String message, String sender, String sessionId) {
        this.user = user;
        this.timestamp = timestamp;
        this.message = message;
        this.sender = sender;
        this.sessionId = sessionId;
    }

}
