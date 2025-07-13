package com.ai.cutsomized_chatbot.controller;

import com.ai.cutsomized_chatbot.dao.UserRepository;
import com.ai.cutsomized_chatbot.dto.AuthRequest;
import com.ai.cutsomized_chatbot.dto.AuthResponse;
import com.ai.cutsomized_chatbot.dto.RegisterRequest;
import com.ai.cutsomized_chatbot.entity.UserEntity;
import com.ai.cutsomized_chatbot.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    private AuthenticationManager authenticationManager;
    private JwtUtil jwtUtil;
    UserRepository userRepo;
    PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> login(@RequestBody AuthRequest request){
        try{
            Authentication authentication=authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword())
            );

            String token=jwtUtil.generateToken(request.getUsername());
            return ResponseEntity.ok(new AuthResponse(token));
        }catch(BadCredentialsException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request){
        if(userRepo.findByUserName(request.getUsername()).isPresent()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Username already exists");
        }

        String hashedPassword=passwordEncoder.encode(request.getPassword());

        UserEntity user=new UserEntity();
        user.setUserName(request.getUsername());
        user.setPassword(hashedPassword);
        userRepo.save(user);

        return ResponseEntity.ok("User Registered succesfully");

    }

}
