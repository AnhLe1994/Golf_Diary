import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('jwt_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (username, password) => {
    const response = await api.post('/api/auth/login', { username, password });
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },
  createTestUser: async () => {
    const response = await api.post('/api/auth/create-test-user');
    return response.data;
  },
};

export const golfRoundsAPI = {
  getGolfRounds: async () => {
    console.log('API: Making request to /api/golf-rounds');
    const response = await api.get('/api/golf-rounds');
    console.log('API: Response status:', response.status);
    console.log('API: Response data:', response.data);
    return response.data;
  },
  createGolfRound: async (golfRoundData) => {
    const response = await api.post('/api/golf-rounds', golfRoundData);
    return response.data;
  },
  getGolfRound: async (id) => {
    const response = await api.get(`/api/golf-rounds/${id}`);
    return response.data;
  },
  updateGolfRound: async (id, golfRoundData) => {
    const response = await api.put(`/api/golf-rounds/${id}`, golfRoundData);
    return response.data;
  },
  deleteGolfRound: async (id) => {
    const response = await api.delete(`/api/golf-rounds/${id}`);
    return response.data;
  },
};

export const lessonsAPI = {
  getLessons: async () => {
    console.log('API: Making request to /api/lessons');
    console.log('API: JWT Token in localStorage:', localStorage.getItem('jwt_token'));
    const response = await api.get('/api/lessons');
    console.log('API: Response status:', response.status);
    console.log('API: Response data:', response.data);
    return response.data;
  },
  getInstructorLessons: async () => {
    const response = await api.get('/api/lessons/instructor');
    return response.data;
  },
  createLesson: async (lessonData) => {
    const response = await api.post('/api/lessons', lessonData);
    return response.data;
  },
  updateLesson: async (id, lessonData) => {
    const response = await api.put(`/api/lessons/${id}`, lessonData);
    return response.data;
  },
  deleteLesson: async (id) => {
    const response = await api.delete(`/api/lessons/${id}`);
    return response.data;
  },
  publishLesson: async (id) => {
    const response = await api.post(`/api/lessons/${id}/publish`);
    return response.data;
  },
  unpublishLesson: async (id) => {
    const response = await api.post(`/api/lessons/${id}/unpublish`);
    return response.data;
  },
};

export default api; 