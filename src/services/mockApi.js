// Mock API service for development
import { authAPI } from './api';

// Mock data for lessons
const mockLessons = [
  {
    id: 1,
    title: "Perfect Your Golf Grip",
    description: "Learn the fundamentals of a proper golf grip that will improve your accuracy and control.",
    content: "The grip is the foundation of your golf swing. Start by placing your left hand on the club with your thumb pointing down the shaft. Your right hand should overlap or interlock with your left hand. The grip should feel secure but not tight. Practice this grip position until it becomes natural.",
    category: "TECHNIQUE",
    level: "BEGINNER",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    isPublished: true,
    createdAt: "2024-01-15T10:30:00Z",
    instructorId: 1
  },
  {
    id: 2,
    title: "Master the Putting Stroke",
    description: "Develop a consistent putting stroke that will lower your scores on the green.",
    content: "Putting accounts for nearly 40% of your strokes. Focus on keeping your head still and your eyes directly over the ball. Use a pendulum motion with your shoulders, not your wrists. Practice distance control by varying the length of your backswing.",
    category: "PUTTING",
    level: "INTERMEDIATE",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    isPublished: true,
    createdAt: "2024-01-20T14:15:00Z",
    instructorId: 1
  },
  {
    id: 3,
    title: "Driver Swing Mechanics",
    description: "Learn the proper mechanics for hitting longer, straighter drives off the tee.",
    content: "The driver swing requires a wider arc and more power than other clubs. Focus on a smooth takeaway, proper weight transfer, and maintaining your spine angle throughout the swing. The key is to hit up on the ball for maximum distance.",
    category: "DRIVING",
    level: "ADVANCED",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    isPublished: true,
    createdAt: "2024-01-25T09:45:00Z",
    instructorId: 1
  },
  {
    id: 4,
    title: "Iron Play Fundamentals",
    description: "Master the basics of iron play for better approach shots and scoring.",
    content: "Iron shots require a descending blow to create proper ball flight. Position the ball in the center of your stance and focus on hitting down and through the ball. Your divot should start after the ball, not before it.",
    category: "IRON_PLAY",
    level: "INTERMEDIATE",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    isPublished: true,
    createdAt: "2024-02-01T11:20:00Z",
    instructorId: 1
  },
  {
    id: 5,
    title: "Bunker Shot Techniques",
    description: "Learn how to escape bunkers with confidence and control.",
    content: "Bunker shots require a different approach than regular shots. Open your stance and clubface, and focus on hitting the sand behind the ball. The sand will lift the ball out of the bunker. Practice the splash shot technique regularly.",
    category: "BUNKER_PLAY",
    level: "ADVANCED",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    isPublished: true,
    createdAt: "2024-02-05T16:30:00Z",
    instructorId: 1
  }
];

// Mock data for golf rounds
const mockGolfRounds = [
  {
    id: 1,
    courseName: "Pebble Beach Golf Links",
    totalScore: 85,
    par: 72,
    weather: "Sunny, 75°F",
    roundDate: "2024-01-15T08:00:00Z",
    notes: "Great round! Improved putting significantly."
  },
  {
    id: 2,
    courseName: "Augusta National",
    totalScore: 92,
    par: 72,
    weather: "Partly cloudy, 68°F",
    roundDate: "2024-01-22T07:30:00Z",
    notes: "Challenging course, need to work on driver accuracy."
  },
  {
    id: 3,
    courseName: "St. Andrews Old Course",
    totalScore: 88,
    par: 72,
    weather: "Windy, 62°F",
    roundDate: "2024-01-29T09:15:00Z",
    notes: "Wind made it difficult, but managed well with low shots."
  },
  {
    id: 4,
    courseName: "Pinehurst No. 2",
    totalScore: 90,
    par: 70,
    weather: "Clear, 78°F",
    roundDate: "2024-02-05T08:45:00Z",
    notes: "Tough greens, need more practice with approach shots."
  }
];

// Mock API functions
export const mockLessonsAPI = {
  getLessons: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockLessons.filter(lesson => lesson.isPublished);
  },
  
  getInstructorLessons: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockLessons;
  },
  
  createLesson: async (lessonData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newLesson = {
      id: mockLessons.length + 1,
      ...lessonData,
      isPublished: false,
      createdAt: new Date().toISOString(),
      instructorId: 1
    };
    mockLessons.push(newLesson);
    return newLesson;
  },
  
  updateLesson: async (id, lessonData) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const index = mockLessons.findIndex(lesson => lesson.id === id);
    if (index !== -1) {
      mockLessons[index] = { ...mockLessons[index], ...lessonData };
      return mockLessons[index];
    }
    throw new Error('Lesson not found');
  },
  
  deleteLesson: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = mockLessons.findIndex(lesson => lesson.id === id);
    if (index !== -1) {
      mockLessons.splice(index, 1);
      return { success: true };
    }
    throw new Error('Lesson not found');
  },
  
  publishLesson: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const lesson = mockLessons.find(lesson => lesson.id === id);
    if (lesson) {
      lesson.isPublished = true;
      return lesson;
    }
    throw new Error('Lesson not found');
  },
  
  unpublishLesson: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const lesson = mockLessons.find(lesson => lesson.id === id);
    if (lesson) {
      lesson.isPublished = false;
      return lesson;
    }
    throw new Error('Lesson not found');
  }
};

export const mockGolfRoundsAPI = {
  getGolfRounds: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockGolfRounds;
  },
  
  createGolfRound: async (golfRoundData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newRound = {
      id: mockGolfRounds.length + 1,
      ...golfRoundData,
      roundDate: golfRoundData.roundDate || new Date().toISOString()
    };
    mockGolfRounds.push(newRound);
    return newRound;
  },
  
  getGolfRound: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const round = mockGolfRounds.find(round => round.id === id);
    if (round) {
      return round;
    }
    throw new Error('Golf round not found');
  },
  
  updateGolfRound: async (id, golfRoundData) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const index = mockGolfRounds.findIndex(round => round.id === id);
    if (index !== -1) {
      mockGolfRounds[index] = { ...mockGolfRounds[index], ...golfRoundData };
      return mockGolfRounds[index];
    }
    throw new Error('Golf round not found');
  },
  
  deleteGolfRound: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = mockGolfRounds.findIndex(round => round.id === id);
    if (index !== -1) {
      mockGolfRounds.splice(index, 1);
      return { success: true };
    }
    throw new Error('Golf round not found');
  }
};

// Export mock auth API (reuse the real one for now)
export const mockAuthAPI = authAPI;
