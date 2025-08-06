package com.golfdiary.backend.controller;

import com.golfdiary.backend.entity.Lesson;
import com.golfdiary.backend.entity.LessonCategory;
import com.golfdiary.backend.entity.LessonLevel;
import com.golfdiary.backend.entity.User;
import com.golfdiary.backend.entity.UserRole;
import com.golfdiary.backend.service.LessonService;
import com.golfdiary.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/lessons")
@CrossOrigin(origins = "http://localhost:3000")
public class LessonController {

    private final LessonService lessonService;
    private final UserService userService;

    public LessonController(LessonService lessonService, UserService userService) {
        this.lessonService = lessonService;
        this.userService = userService;
    }

    // Get all published lessons (for students)
    @GetMapping
    public ResponseEntity<List<Lesson>> getAllPublishedLessons() {
        System.out.println("GET /api/lessons - Accessing lessons endpoint");
        List<Lesson> lessons = lessonService.getAllPublishedLessons();
        System.out.println("Found " + lessons.size() + " published lessons");
        return ResponseEntity.ok(lessons);
    }

    // Get lessons by category (for students)
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Lesson>> getLessonsByCategory(@PathVariable LessonCategory category) {
        List<Lesson> lessons = lessonService.getLessonsByCategory(category);
        return ResponseEntity.ok(lessons);
    }

    // Get lessons by level (for students)
    @GetMapping("/level/{level}")
    public ResponseEntity<List<Lesson>> getLessonsByLevel(@PathVariable LessonLevel level) {
        List<Lesson> lessons = lessonService.getLessonsByLevel(level);
        return ResponseEntity.ok(lessons);
    }

    // Get lesson by ID (for students)
    @GetMapping("/{id}")
    public ResponseEntity<Lesson> getLessonById(@PathVariable Long id) {
        Optional<Lesson> lesson = lessonService.getLessonById(id);
        if (lesson.isPresent() && lesson.get().isPublished()) {
            return ResponseEntity.ok(lesson.get());
        }
        return ResponseEntity.notFound().build();
    }

    // Instructor endpoints
    @PostMapping
    public ResponseEntity<Lesson> createLesson(@RequestBody Lesson lesson) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userService.findByUsername(username).orElse(null);
        
        if (user == null || user.getRole() != UserRole.INSTRUCTOR) {
            return ResponseEntity.status(403).build();
        }
        
        lesson.setInstructor(user);
        Lesson createdLesson = lessonService.createLesson(lesson);
        return ResponseEntity.ok(createdLesson);
    }

    @GetMapping("/instructor")
    public ResponseEntity<List<Lesson>> getInstructorLessons() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userService.findByUsername(username).orElse(null);
        
        if (user == null || user.getRole() != UserRole.INSTRUCTOR) {
            return ResponseEntity.status(403).build();
        }
        
        List<Lesson> lessons = lessonService.getLessonsByInstructor(user);
        return ResponseEntity.ok(lessons);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Lesson> updateLesson(@PathVariable Long id, @RequestBody Lesson lesson) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userService.findByUsername(username).orElse(null);
        
        if (user == null || user.getRole() != UserRole.INSTRUCTOR) {
            return ResponseEntity.status(403).build();
        }
        
        Optional<Lesson> existingLesson = lessonService.getLessonById(id);
        if (existingLesson.isPresent() && existingLesson.get().getInstructor().getId().equals(user.getId())) {
            lesson.setId(id);
            lesson.setInstructor(user);
            Lesson updatedLesson = lessonService.updateLesson(lesson);
            return ResponseEntity.ok(updatedLesson);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLesson(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userService.findByUsername(username).orElse(null);
        
        if (user == null || user.getRole() != UserRole.INSTRUCTOR) {
            return ResponseEntity.status(403).build();
        }
        
        Optional<Lesson> lesson = lessonService.getLessonById(id);
        if (lesson.isPresent() && lesson.get().getInstructor().getId().equals(user.getId())) {
            lessonService.deleteLesson(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/publish")
    public ResponseEntity<Lesson> publishLesson(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userService.findByUsername(username).orElse(null);
        
        if (user == null || user.getRole() != UserRole.INSTRUCTOR) {
            return ResponseEntity.status(403).build();
        }
        
        Optional<Lesson> lesson = lessonService.getLessonById(id);
        if (lesson.isPresent() && lesson.get().getInstructor().getId().equals(user.getId())) {
            Lesson publishedLesson = lessonService.publishLesson(id);
            return ResponseEntity.ok(publishedLesson);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/unpublish")
    public ResponseEntity<Lesson> unpublishLesson(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userService.findByUsername(username).orElse(null);
        
        if (user == null || user.getRole() != UserRole.INSTRUCTOR) {
            return ResponseEntity.status(403).build();
        }
        
        Optional<Lesson> lesson = lessonService.getLessonById(id);
        if (lesson.isPresent() && lesson.get().getInstructor().getId().equals(user.getId())) {
            Lesson unpublishedLesson = lessonService.unpublishLesson(id);
            return ResponseEntity.ok(unpublishedLesson);
        }
        return ResponseEntity.notFound().build();
    }

    // Test endpoint to check if the controller is accessible
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        System.out.println("GET /api/lessons/test - Test endpoint accessed");
        return ResponseEntity.ok("Lessons controller is working!");
    }
} 