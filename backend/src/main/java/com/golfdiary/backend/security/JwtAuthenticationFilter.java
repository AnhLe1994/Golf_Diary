package com.golfdiary.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String requestURI = request.getRequestURI();
        String method = request.getMethod();
        
        System.out.println("JWT Filter: Checking if should filter - URI: " + requestURI + ", Method: " + method);
        
        // Don't apply this filter to public endpoints
        boolean shouldNotFilter = requestURI.startsWith("/api/auth/") || 
               (requestURI.startsWith("/api/lessons") && method.equals("GET") && !requestURI.contains("/instructor"));
        
        System.out.println("JWT Filter: Should NOT filter this request: " + shouldNotFilter);
        
        if (shouldNotFilter) {
            System.out.println("JWT Filter: SKIPPING this request - it's a public endpoint");
        } else {
            System.out.println("JWT Filter: WILL PROCESS this request - it requires authentication");
        }
        
        return shouldNotFilter;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        System.out.println("JWT Filter: Processing request to " + request.getRequestURI());
        System.out.println("JWT Filter: Authorization header: " + (authHeader != null ? "present" : "null"));

        // If no Authorization header, just continue without authentication
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("JWT Filter: No valid Authorization header, continuing without authentication");
            filterChain.doFilter(request, response);
            return;
        }

        // If we have an Authorization header but it's invalid, return 401
        jwt = authHeader.substring(7);
        username = jwtUtil.extractUsername(jwt);
        System.out.println("JWT Filter: Extracted username: " + username);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
                if (jwtUtil.validateToken(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    System.out.println("JWT Filter: Authentication successful for user: " + username);
                } else {
                    System.out.println("JWT Filter: Token validation failed for user: " + username);
                    // Don't continue with invalid token
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    return;
                }
            } catch (Exception e) {
                System.out.println("JWT Filter: Error processing authentication: " + e.getMessage());
                // Don't continue with authentication error
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
} 