package com.golfdiary.backend.controller;

import com.golfdiary.backend.entity.GolfRound;
import com.golfdiary.backend.entity.User;
import com.golfdiary.backend.service.GolfRoundService;
import com.golfdiary.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/golf-rounds")
@CrossOrigin(origins = "http://localhost:3000")
public class GolfRoundController {

    private final GolfRoundService golfRoundService;
    private final UserService userService;

    public GolfRoundController(GolfRoundService golfRoundService, UserService userService) {
        this.golfRoundService = golfRoundService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<GolfRound>> getAllRounds() {
        User currentUser = getCurrentUser();
        List<GolfRound> rounds = golfRoundService.getAllRoundsByUser(currentUser);
        return ResponseEntity.ok(rounds);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GolfRound> getRoundById(@PathVariable Long id) {
        User currentUser = getCurrentUser();
        Optional<GolfRound> round = golfRoundService.getRoundById(id);
        
        if (round.isPresent() && round.get().getUser().getId().equals(currentUser.getId())) {
            return ResponseEntity.ok(round.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<GolfRound> createRound(@RequestBody GolfRound golfRound) {
        User currentUser = getCurrentUser();
        golfRound.setUser(currentUser);
        GolfRound savedRound = golfRoundService.createGolfRound(golfRound);
        return ResponseEntity.ok(savedRound);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GolfRound> updateRound(@PathVariable Long id, @RequestBody GolfRound golfRound) {
        User currentUser = getCurrentUser();
        Optional<GolfRound> existingRound = golfRoundService.getRoundById(id);
        
        if (existingRound.isPresent() && existingRound.get().getUser().getId().equals(currentUser.getId())) {
            golfRound.setId(id);
            golfRound.setUser(currentUser);
            GolfRound updatedRound = golfRoundService.updateGolfRound(golfRound);
            return ResponseEntity.ok(updatedRound);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRound(@PathVariable Long id) {
        User currentUser = getCurrentUser();
        Optional<GolfRound> round = golfRoundService.getRoundById(id);
        
        if (round.isPresent() && round.get().getUser().getId().equals(currentUser.getId())) {
            golfRoundService.deleteGolfRound(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/course/{courseName}")
    public ResponseEntity<List<GolfRound>> getRoundsByCourse(@PathVariable String courseName) {
        User currentUser = getCurrentUser();
        List<GolfRound> rounds = golfRoundService.getRoundsByUserAndCourse(currentUser, courseName);
        return ResponseEntity.ok(rounds);
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<GolfRound>> getRoundsByDateRange(
            @RequestParam LocalDateTime startDate,
            @RequestParam LocalDateTime endDate) {
        User currentUser = getCurrentUser();
        List<GolfRound> rounds = golfRoundService.getRoundsByUserAndDateRange(currentUser, startDate, endDate);
        return ResponseEntity.ok(rounds);
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
} 