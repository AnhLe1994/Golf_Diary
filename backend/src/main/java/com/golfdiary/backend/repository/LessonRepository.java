package com.golfdiary.backend.repository;

import com.golfdiary.backend.entity.Lesson;
import com.golfdiary.backend.entity.LessonCategory;
import com.golfdiary.backend.entity.LessonLevel;
import com.golfdiary.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> findByInstructorOrderByCreatedAtDesc(User instructor);
    List<Lesson> findByIsPublishedTrueOrderByCreatedAtDesc();
    List<Lesson> findByCategoryAndIsPublishedTrueOrderByCreatedAtDesc(LessonCategory category);
    List<Lesson> findByLevelAndIsPublishedTrueOrderByCreatedAtDesc(LessonLevel level);
    List<Lesson> findByCategoryAndLevelAndIsPublishedTrueOrderByCreatedAtDesc(LessonCategory category, LessonLevel level);
} 