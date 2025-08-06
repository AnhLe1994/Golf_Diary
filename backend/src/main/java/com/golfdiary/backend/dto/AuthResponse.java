package com.golfdiary.backend.dto;

import com.golfdiary.backend.entity.UserRole;

public class AuthResponse {
    private String token;
    private String username;
    private String message;
    private UserRole role;

    // Constructors
    public AuthResponse() {}

    public AuthResponse(String token, String username, UserRole role) {
        this.token = token;
        this.username = username;
        this.role = role;
    }

    public AuthResponse(String message) {
        this.message = message;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }
} 