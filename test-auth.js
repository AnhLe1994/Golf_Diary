// Test script to debug authentication issues
// Run this in the browser console to test the API calls

const API_BASE_URL = 'http://localhost:8080';

// Test function to check authentication
async function testAuth() {
  console.log('=== Testing Authentication ===');
  
  // Check if token exists
  const token = localStorage.getItem('jwt_token');
  console.log('JWT Token exists:', !!token);
  if (token) {
    console.log('Token length:', token.length);
    console.log('Token starts with:', token.substring(0, 20) + '...');
  }
  
  // Test login
  try {
    console.log('\n=== Testing Login ===');
    const loginResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'instructor1',
        password: 'password'
      })
    });
    
    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      console.log('Login successful:', loginData);
      
      // Test instructor lessons with new token
      console.log('\n=== Testing Instructor Lessons with new token ===');
      const lessonsResponse = await fetch(`${API_BASE_URL}/api/lessons/instructor`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${loginData.token}`,
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Lessons response status:', lessonsResponse.status);
      if (lessonsResponse.ok) {
        const lessonsData = await lessonsResponse.json();
        console.log('Lessons data:', lessonsData);
      } else {
        const errorText = await lessonsResponse.text();
        console.log('Lessons error:', errorText);
      }
    } else {
      const errorText = await loginResponse.text();
      console.log('Login failed:', errorText);
    }
  } catch (error) {
    console.error('Test error:', error);
  }
}

// Test function to check current token
async function testCurrentToken() {
  console.log('=== Testing Current Token ===');
  
  const token = localStorage.getItem('jwt_token');
  if (!token) {
    console.log('No token found in localStorage');
    return;
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/lessons/instructor`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('Success - Lessons data:', data);
    } else {
      const errorText = await response.text();
      console.log('Error response:', errorText);
    }
  } catch (error) {
    console.error('Request error:', error);
  }
}

// Run tests
console.log('Authentication test functions loaded. Run testAuth() or testCurrentToken() to test.'); 