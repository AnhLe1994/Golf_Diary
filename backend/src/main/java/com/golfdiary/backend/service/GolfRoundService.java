package com.golfdiary.backend.service;

import com.golfdiary.backend.entity.GolfRound;
import com.golfdiary.backend.entity.User;
import com.golfdiary.backend.repository.GolfRoundRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class GolfRoundService {

    private final GolfRoundRepository golfRoundRepository;

    public GolfRoundService(GolfRoundRepository golfRoundRepository) {
        this.golfRoundRepository = golfRoundRepository;
    }

    public GolfRound createGolfRound(GolfRound golfRound) {
        return golfRoundRepository.save(golfRound);
    }

    public List<GolfRound> getAllRoundsByUser(User user) {
        return golfRoundRepository.findByUserOrderByRoundDateDesc(user);
    }

    public List<GolfRound> getRoundsByUserAndDateRange(User user, LocalDateTime startDate, LocalDateTime endDate) {
        return golfRoundRepository.findByUserAndRoundDateBetweenOrderByRoundDateDesc(user, startDate, endDate);
    }

    public List<GolfRound> getRoundsByUserAndCourse(User user, String courseName) {
        return golfRoundRepository.findByUserAndCourseNameOrderByRoundDateDesc(user, courseName);
    }

    public Optional<GolfRound> getRoundById(Long id) {
        return golfRoundRepository.findById(id);
    }

    public GolfRound updateGolfRound(GolfRound golfRound) {
        return golfRoundRepository.save(golfRound);
    }

    public void deleteGolfRound(Long id) {
        golfRoundRepository.deleteById(id);
    }
} 