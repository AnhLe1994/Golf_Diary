// Comprehensive debug script for the 403 issue
// Run this in the browser console to debug the problem

const API_BASE_URL = 'http://localhost:8080';

// Function to decode JWT token
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

// Test 1: Check JWT token
async function testJWTToken() {
  console.log('🔍 Test 1: Checking JWT Token');
  
  const token = localStorage.getItem('jwt_token');
  if (!token) {
    console.log('❌ No JWT token found');
    return;
  }
  
  console.log('Token found:', token.substring(0, 50) + '...');
  
  const decoded = decodeJWT(token);
  if (decoded) {
    console.log('Decoded payload:', decoded);
    
    const now = Math.floor(Date.now() / 1000);
    const exp = decoded.exp;
    
    if (exp < now) {
      console.log('❌ Token is EXPIRED!');
    } else {
      console.log('✅ Token is valid');
      console.log('Username in token:', decoded.sub);
    }
  }
}

// Test 2: Check if user exists
async function testUserExists() {
  console.log('\n🔍 Test 2: Checking if user exists');
  
  const token = localStorage.getItem('jwt_token');
  if (!token) {
    console.log('No token available');
    return;
  }
  
  const decoded = decodeJWT(token);
  if (!decoded) {
    console.log('Cannot decode token');
    return;
  }
  
  const username = decoded.sub;
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/check-user/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.ok) {
      const result = await response.text();
      console.log('User check result:', result);
    } else {
      console.log('Failed to check user:', response.status);
    }
  } catch (error) {
    console.error('Error checking user:', error);
  }
}

// Test 3: Test lessons endpoint without token
async function testLessonsWithoutToken() {
  console.log('\n🔍 Test 3: Testing lessons endpoint WITHOUT token');
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/lessons`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Success! Found', data.length, 'lessons');
      console.log('Lessons:', data);
    } else {
      const errorText = await response.text();
      console.log('❌ Failed:', errorText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Test 4: Test lessons endpoint with token
async function testLessonsWithToken() {
  console.log('\n🔍 Test 4: Testing lessons endpoint WITH token');
  
  const token = localStorage.getItem('jwt_token');
  if (!token) {
    console.log('No token available');
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
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Success! Found', data.length, 'lessons');
    } else {
      const errorText = await response.text();
      console.log('❌ Failed:', errorText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Test 5: Test backend health
async function testBackendHealth() {
  console.log('\n🔍 Test 5: Testing backend health');
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/lessons/test`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.ok) {
      const result = await response.text();
      console.log('✅ Backend is healthy:', result);
    } else {
      console.log('❌ Backend health check failed:', response.status);
    }
  } catch (error) {
    console.error('Backend health error:', error);
  }
}

// Test 6: Test database debug
async function testDatabaseDebug() {
  console.log('\n🔍 Test 6: Testing database debug');
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/lessons/debug`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.ok) {
      const result = await response.text();
      console.log('Database debug info:', result);
    } else {
      console.log('Database debug failed:', response.status);
    }
  } catch (error) {
    console.error('Database debug error:', error);
  }
}

// Run all tests
async function runAllDebugTests() {
  console.log('🧪 Running comprehensive debug tests...');
  console.log('=====================================');
  
  await testJWTToken();
  await testUserExists();
  await testLessonsWithoutToken();
  await testLessonsWithToken();
  await testBackendHealth();
  await testDatabaseDebug();
  
  console.log('\n=====================================');
  console.log('✅ All debug tests completed!');
}

// Run tests
console.log('Debug test functions loaded. Run runAllDebugTests() to run all tests, or run individual tests like testJWTToken(), testLessonsWithoutToken(), etc.'); 