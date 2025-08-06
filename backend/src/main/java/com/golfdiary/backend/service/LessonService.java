package com.golfdiary.backend.service;

import com.golfdiary.backend.entity.Lesson;
import com.golfdiary.backend.entity.LessonCategory;
import com.golfdiary.backend.entity.LessonLevel;
import com.golfdiary.backend.entity.User;
import com.golfdiary.backend.repository.LessonRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class LessonService {

    private final LessonRepository lessonRepository;

    public LessonService(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }

    public Lesson createLesson(Lesson lesson) {
        lesson.setCreatedAt(LocalDateTime.now());
        lesson.setUpdatedAt(LocalDateTime.now());
        return lessonRepository.save(lesson);
    }

    public List<Lesson> getAllPublishedLessons() {
        return lessonRepository.findByIsPublishedTrueOrderByCreatedAtDesc();
    }

    public List<Lesson> getLessonsByInstructor(User instructor) {
        return lessonRepository.findByInstructorOrderByCreatedAtDesc(instructor);
    }

    public List<Lesson> getLessonsByCategory(LessonCategory category) {
        return lessonRepository.findByCategoryAndIsPublishedTrueOrderByCreatedAtDesc(category);
    }

    public List<Lesson> getLessonsByLevel(LessonLevel level) {
        return lessonRepository.findByLevelAndIsPublishedTrueOrderByCreatedAtDesc(level);
    }

    public List<Lesson> getLessonsByCategoryAndLevel(LessonCategory category, LessonLevel level) {
        return lessonRepository.findByCategoryAndLevelAndIsPublishedTrueOrderByCreatedAtDesc(category, level);
    }

    public Optional<Lesson> getLessonById(Long id) {
        return lessonRepository.findById(id);
    }

    public Lesson updateLesson(Lesson lesson) {
        lesson.setUpdatedAt(LocalDateTime.now());
        return lessonRepository.save(lesson);
    }

    public void deleteLesson(Long id) {
        lessonRepository.deleteById(id);
    }

    public Lesson publishLesson(Long id) {
        Optional<Lesson> lessonOpt = lessonRepository.findById(id);
        if (lessonOpt.isPresent()) {
            Lesson lesson = lessonOpt.get();
            lesson.setPublished(true);
            lesson.setUpdatedAt(LocalDateTime.now());
            return lessonRepository.save(lesson);
        }
        throw new RuntimeException("Lesson not found");
    }

    public Lesson unpublishLesson(Long id) {
        Optional<Lesson> lessonOpt = lessonRepository.findById(id);
        if (lessonOpt.isPresent()) {
            Lesson lesson = lessonOpt.get();
            lesson.setPublished(false);
            lesson.setUpdatedAt(LocalDateTime.now());
            return lessonRepository.save(lesson);
        }
        throw new RuntimeException("Lesson not found");
    }
} 