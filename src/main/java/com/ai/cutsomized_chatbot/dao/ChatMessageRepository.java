package com.ai.cutsomized_chatbot.dao;

import com.ai.cutsomized_chatbot.entity.ChatHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatHistoryEntity,Long> {
    List<ChatHistoryEntity> findBySessionIdOrderByTimestampAsc(String sessionId);

}
