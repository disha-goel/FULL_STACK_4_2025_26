package com.easyjobs.service;

import com.easyjobs.model.User;
import com.easyjobs.repository.UserRepository;
import com.easyjobs.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepo, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public Map<String, Object> register(String name, String email, String password, String role) {
        if (userRepo.existsByEmail(email)) {
            throw new RuntimeException("Email already registered");
        }
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role != null ? role : "USER");
        userRepo.save(user);

        String token = jwtUtil.generateToken(email, user.getRole());
        return Map.of("token", token, "name", user.getName(), "email", user.getEmail(), "role", user.getRole());
    }

    public Map<String, Object> login(String email, String password) {
        User user = userRepo.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(email, user.getRole());
        return Map.of("token", token, "name", user.getName(), "email", user.getEmail(), "role", user.getRole());
    }
}
