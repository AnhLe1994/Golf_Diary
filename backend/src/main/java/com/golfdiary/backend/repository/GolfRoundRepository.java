package com.golfdiary.backend.repository;

import com.golfdiary.backend.entity.GolfRound;
import com.golfdiary.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface GolfRoundRepository extends JpaRepository<GolfRound, Long> {
    List<GolfRound> findByUserOrderByRoundDateDesc(User user);
    List<GolfRound> findByUserAndRoundDateBetweenOrderByRoundDateDesc(User user, LocalDateTime startDate, LocalDateTime endDate);
    List<GolfRound> findByUserAndCourseNameOrderByRoundDateDesc(User user, String courseName);
} 