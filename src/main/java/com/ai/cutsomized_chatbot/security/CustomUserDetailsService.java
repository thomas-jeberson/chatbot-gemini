package com.ai.cutsomized_chatbot.security;

import com.ai.cutsomized_chatbot.dao.UserRepository;
import com.ai.cutsomized_chatbot.entity.UserEntity;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class  CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepo;

    public CustomUserDetailsService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepo.findByUserName(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        //using spring defualt thing, we can get only simple details like name, password and roles. but if we need more details we use UserPrincipal
        return new UserPrincipal(user);
    }
}
