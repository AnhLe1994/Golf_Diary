package com.golfdiary.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "golf_rounds")
public class GolfRound {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @NotNull
    private String courseName;
    
    @NotNull
    private LocalDateTime roundDate;
    
    private Integer totalScore;
    private Integer par;
    private Integer birdies;
    private Integer pars;
    private Integer bogeys;
    private Integer doubleBogeys;
    private Integer other;
    
    private String weather;
    private String notes;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public GolfRound() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public String getCourseName() {
        return courseName;
    }
    
    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }
    
    public LocalDateTime getRoundDate() {
        return roundDate;
    }
    
    public void setRoundDate(LocalDateTime roundDate) {
        this.roundDate = roundDate;
    }
    
    public Integer getTotalScore() {
        return totalScore;
    }
    
    public void setTotalScore(Integer totalScore) {
        this.totalScore = totalScore;
    }
    
    public Integer getPar() {
        return par;
    }
    
    public void setPar(Integer par) {
        this.par = par;
    }
    
    public Integer getBirdies() {
        return birdies;
    }
    
    public void setBirdies(Integer birdies) {
        this.birdies = birdies;
    }
    
    public Integer getPars() {
        return pars;
    }
    
    public void setPars(Integer pars) {
        this.pars = pars;
    }
    
    public Integer getBogeys() {
        return bogeys;
    }
    
    public void setBogeys(Integer bogeys) {
        this.bogeys = bogeys;
    }
    
    public Integer getDoubleBogeys() {
        return doubleBogeys;
    }
    
    public void setDoubleBogeys(Integer doubleBogeys) {
        this.doubleBogeys = doubleBogeys;
    }
    
    public Integer getOther() {
        return other;
    }
    
    public void setOther(Integer other) {
        this.other = other;
    }
    
    public String getWeather() {
        return weather;
    }
    
    public void setWeather(String weather) {
        this.weather = weather;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
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
    
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
} 