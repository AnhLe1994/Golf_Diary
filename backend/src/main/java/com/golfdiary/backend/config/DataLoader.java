package com.golfdiary.backend.config;

import com.golfdiary.backend.entity.Lesson;
import com.golfdiary.backend.entity.LessonCategory;
import com.golfdiary.backend.entity.LessonLevel;
import com.golfdiary.backend.entity.User;
import com.golfdiary.backend.entity.UserRole;
import com.golfdiary.backend.repository.LessonRepository;
import com.golfdiary.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initData(UserRepository userRepository, 
                              LessonRepository lessonRepository,
                              PasswordEncoder passwordEncoder) {
        return args -> {
            // Create test instructor users if they don't exist
            User instructor1 = userRepository.findByUsername("instructor1")
                .orElseGet(() -> {
                    User user = new User();
                    user.setUsername("instructor1");
                    user.setPassword(passwordEncoder.encode("password"));
                    user.setEmail("instructor1@golfdiary.com");
                    user.setRole(UserRole.INSTRUCTOR);
                    return userRepository.save(user);
                });

            User instructor2 = userRepository.findByUsername("instructor2")
                .orElseGet(() -> {
                    User user = new User();
                    user.setUsername("instructor2");
                    user.setPassword(passwordEncoder.encode("password"));
                    user.setEmail("instructor2@golfdiary.com");
                    user.setRole(UserRole.INSTRUCTOR);
                    return userRepository.save(user);
                });

            // Create test lessons if they don't exist
            if (lessonRepository.count() == 0) {
                // Lesson 1
                Lesson lesson1 = new Lesson();
                lesson1.setTitle("Perfect Your Golf Grip");
                lesson1.setDescription("Learn the fundamentals of a proper golf grip that will improve your accuracy and control.");
                lesson1.setContent("The grip is the foundation of your golf swing. Start by placing your left hand on the club with your thumb pointing down the shaft. Your right hand should overlap or interlock with your left hand. The grip should feel secure but not tight. Practice this grip position until it becomes natural.");
                lesson1.setCategory(LessonCategory.TECHNIQUE);
                lesson1.setLevel(LessonLevel.BEGINNER);
                lesson1.setVideoUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
                lesson1.setPublished(true);
                lesson1.setInstructor(instructor1);
                lesson1.setCreatedAt(LocalDateTime.now());
                lesson1.setUpdatedAt(LocalDateTime.now());
                lessonRepository.save(lesson1);

                // Lesson 2
                Lesson lesson2 = new Lesson();
                lesson2.setTitle("Master the Golf Swing");
                lesson2.setDescription("Develop a consistent and powerful golf swing with proper form and technique.");
                lesson2.setContent("A proper golf swing consists of four main phases: backswing, downswing, impact, and follow-through. Focus on maintaining a smooth tempo and keeping your head still throughout the swing. Practice with a mirror to check your form.");
                lesson2.setCategory(LessonCategory.TECHNIQUE);
                lesson2.setLevel(LessonLevel.INTERMEDIATE);
                lesson2.setVideoUrl("https://www.youtube.com/watch?v=example2");
                lesson2.setPublished(true);
                lesson2.setInstructor(instructor1);
                lesson2.setCreatedAt(LocalDateTime.now());
                lesson2.setUpdatedAt(LocalDateTime.now());
                lessonRepository.save(lesson2);

                // Lesson 3
                Lesson lesson3 = new Lesson();
                lesson3.setTitle("Putting Fundamentals");
                lesson3.setDescription("Master the art of putting with proper alignment and stroke technique.");
                lesson3.setContent("Putting is all about consistency and feel. Keep your head still and your eyes directly over the ball. Use a pendulum motion with your shoulders, not your wrists. Practice distance control on the practice green.");
                lesson3.setCategory(LessonCategory.PUTTING);
                lesson3.setLevel(LessonLevel.BEGINNER);
                lesson3.setVideoUrl("https://www.youtube.com/watch?v=example3");
                lesson3.setPublished(true);
                lesson3.setInstructor(instructor2);
                lesson3.setCreatedAt(LocalDateTime.now());
                lesson3.setUpdatedAt(LocalDateTime.now());
                lessonRepository.save(lesson3);

                // Lesson 4
                Lesson lesson4 = new Lesson();
                lesson4.setTitle("Advanced Driving Techniques");
                lesson4.setDescription("Learn advanced driving techniques to maximize distance and accuracy off the tee.");
                lesson4.setContent("For maximum distance, focus on creating lag in your swing and maintaining proper spine angle. Use your legs to generate power and keep your head behind the ball at impact. Practice with different tee heights to find your optimal setup.");
                lesson4.setCategory(LessonCategory.DRIVING);
                lesson4.setLevel(LessonLevel.ADVANCED);
                lesson4.setVideoUrl("https://www.youtube.com/watch?v=example4");
                lesson4.setPublished(true);
                lesson4.setInstructor(instructor1);
                lesson4.setCreatedAt(LocalDateTime.now());
                lesson4.setUpdatedAt(LocalDateTime.now());
                lessonRepository.save(lesson4);

                // Lesson 5
                Lesson lesson5 = new Lesson();
                lesson5.setTitle("Course Management Strategies");
                lesson5.setDescription("Learn strategic thinking and course management to improve your overall game.");
                lesson5.setContent("Course management involves making smart decisions about club selection, shot placement, and risk assessment. Always play to your strengths and avoid high-risk shots unless necessary. Study the course layout before playing.");
                lesson5.setCategory(LessonCategory.COURSE_MANAGEMENT);
                lesson5.setLevel(LessonLevel.INTERMEDIATE);
                lesson5.setVideoUrl("https://www.youtube.com/watch?v=example5");
                lesson5.setPublished(true);
                lesson5.setInstructor(instructor2);
                lesson5.setCreatedAt(LocalDateTime.now());
                lesson5.setUpdatedAt(LocalDateTime.now());
                lessonRepository.save(lesson5);

                System.out.println("Test data initialized successfully!");
            }
        };
    }
} 