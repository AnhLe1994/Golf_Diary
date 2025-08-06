import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Create axios instance for public endpoints (no JWT)
const publicApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Public lessons API (no authentication required)
export const publicLessonsAPI = {
  getLessons: async () => {
    console.log('Public API: Making request to /api/lessons');
    const response = await publicApi.get('/api/lessons');
    console.log('Public API: Response status:', response.status);
    console.log('Public API: Response data:', response.data);
    return response.data;
  },
};

export default publicApi; 