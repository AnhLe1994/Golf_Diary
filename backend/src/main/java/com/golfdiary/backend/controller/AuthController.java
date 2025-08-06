package com.golfdiary.backend.controller;

import com.golfdiary.backend.dto.AuthRequest;
import com.golfdiary.backend.dto.AuthResponse;
import com.golfdiary.backend.dto.RegisterRequest;
import com.golfdiary.backend.entity.User;
import com.golfdiary.backend.entity.UserRole;
import com.golfdiary.backend.security.JwtUtil;
import com.golfdiary.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, UserService userService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        try {
            User user = userService.registerUser(
                request.getUsername(),
                request.getEmail(),
                request.getPassword(),
                request.getFirstName(),
                request.getLastName(),
                request.getRole()
            );
            
            return ResponseEntity.ok(new AuthResponse("User registered successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new AuthResponse(e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            UserDetails userDetails = userService.loadUserByUsername(request.getUsername());
            String token = jwtUtil.generateToken(userDetails);
            
            User user = userService.findByUsername(request.getUsername()).orElse(null);
            UserRole role = user != null ? user.getRole() : UserRole.STUDENT;
            
            return ResponseEntity.ok(new AuthResponse(token, request.getUsername(), role));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AuthResponse("Invalid username or password"));
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Auth endpoint is working!");
    }
    
    @GetMapping("/check-user/{username}")
    public ResponseEntity<String> checkUser(@PathVariable String username) {
        try {
            Optional<User> user = userService.findByUsername(username);
            if (user.isPresent()) {
                return ResponseEntity.ok("User " + username + " exists with role: " + user.get().getRole());
            } else {
                return ResponseEntity.ok("User " + username + " does not exist");
            }
        } catch (Exception e) {
            return ResponseEntity.ok("Error checking user: " + e.getMessage());
        }
    }
} 