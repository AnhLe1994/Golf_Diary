// Test script to debug JWT token issues
// Run this in the browser console to test the JWT token

const API_BASE_URL = 'http://localhost:8080';

// Function to decode JWT token (without verification)
function decodeJWT(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

// Test function to check JWT token
function testJWTToken() {
  console.log('=== Testing JWT Token ===');
  
  const token = localStorage.getItem('jwt_token');
  if (!token) {
    console.log('❌ No JWT token found in localStorage');
    return;
  }
  
  console.log('JWT Token found:', token.substring(0, 50) + '...');
  
  // Decode the token
  const decoded = decodeJWT(token);
  if (decoded) {
    console.log('Decoded JWT payload:', decoded);
    
    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    const exp = decoded.exp;
    const iat = decoded.iat;
    
    console.log('Current time (Unix):', now);
    console.log('Token issued at (Unix):', iat);
    console.log('Token expires at (Unix):', exp);
    
    if (exp < now) {
      console.log('❌ Token is EXPIRED!');
    } else {
      console.log('✅ Token is still valid');
      const timeLeft = exp - now;
      console.log('Time left:', Math.floor(timeLeft / 60), 'minutes');
    }
    
    console.log('Token subject (username):', decoded.sub);
  } else {
    console.log('❌ Could not decode JWT token');
  }
}

// Test function to check if user exists
async function testUserExists() {
  console.log('=== Testing User Existence ===');
  
  const token = localStorage.getItem('jwt_token');
  if (!token) {
    console.log('No token available for user test');
    return;
  }
  
  try {
    // Try to access a protected endpoint to see if user exists
    const response = await fetch(`${API_BASE_URL}/api/golf-rounds`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    console.log('User test response status:', response.status);
    
    if (response.status === 200) {
      console.log('✅ User authentication successful');
    } else if (response.status === 401) {
      console.log('❌ User authentication failed - token invalid or user not found');
    } else if (response.status === 403) {
      console.log('⚠️  User authenticated but access forbidden');
    } else {
      console.log('❓ Unexpected response:', response.status);
    }
  } catch (error) {
    console.error('User test error:', error);
  }
}

// Test function to check lessons without token
async function testLessonsWithoutToken() {
  console.log('=== Testing Lessons Without Token ===');
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/lessons`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('Lessons without token - response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Lessons accessible without token:', data.length, 'lessons');
    } else {
      const errorText = await response.text();
      console.log('❌ Lessons not accessible without token:', errorText);
    }
  } catch (error) {
    console.error('Lessons without token test error:', error);
  }
}

// Test function to check lessons with token
async function testLessonsWithToken() {
  console.log('=== Testing Lessons With Token ===');
  
  const token = localStorage.getItem('jwt_token');
  if (!token) {
    console.log('No token available for lessons test');
    return;
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/lessons`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    console.log('Lessons with token - response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Lessons accessible with token:', data.length, 'lessons');
    } else {
      const errorText = await response.text();
      console.log('❌ Lessons not accessible with token:', errorText);
    }
  } catch (error) {
    console.error('Lessons with token test error:', error);
  }
}

// Run all JWT tests
async function runJWTTests() {
  console.log('🧪 Running all JWT token tests...');
  
  testJWTToken();
  await testUserExists();
  await testLessonsWithoutToken();
  await testLessonsWithToken();
  
  console.log('✅ All JWT tests completed!');
}

// Run tests
console.log('JWT token test functions loaded. Run testJWTToken(), testUserExists(), testLessonsWithoutToken(), testLessonsWithToken(), or runJWTTests() to test.'); 