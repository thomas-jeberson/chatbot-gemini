package com.ai.cutsomized_chatbot.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "username")
    private String userName;

    @Column(name = "password")
    private String password;

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<ChatHistoryEntity> chatHistoryEntityList=new ArrayList<>();

    public UserEntity(String userName, String password, List<ChatHistoryEntity> chatHistoryEntityList) {
        this.userName = userName;
        this.password = password;
        this.chatHistoryEntityList = chatHistoryEntityList;
    }

    public String getUsername(){
        return this. userName;
    }
}
