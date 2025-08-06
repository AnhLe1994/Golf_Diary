package com.golfdiary.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "lessons")
public class Lesson {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User instructor;
    
    @NotBlank
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    
    private String videoUrl;
    private String documentUrl;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private LessonCategory category = LessonCategory.TECHNIQUE;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private LessonLevel level = LessonLevel.BEGINNER;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    private boolean isPublished = false;
    
    // Constructors
    public Lesson() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public Lesson(String title, String description, String content, User instructor) {
        this();
        this.title = title;
        this.description = description;
        this.content = content;
        this.instructor = instructor;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public User getInstructor() {
        return instructor;
    }
    
    public void setInstructor(User instructor) {
        this.instructor = instructor;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
    
    public String getVideoUrl() {
        return videoUrl;
    }
    
    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
    
    public String getDocumentUrl() {
        return documentUrl;
    }
    
    public void setDocumentUrl(String documentUrl) {
        this.documentUrl = documentUrl;
    }
    
    public LessonCategory getCategory() {
        return category;
    }
    
    public void setCategory(LessonCategory category) {
        this.category = category;
    }
    
    public LessonLevel getLevel() {
        return level;
    }
    
    public void setLevel(LessonLevel level) {
        this.level = level;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public boolean isPublished() {
        return isPublished;
    }
    
    public void setPublished(boolean published) {
        isPublished = published;
    }
} 