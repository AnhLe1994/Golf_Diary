// Simple test to verify backend is working
// Run this in the browser console

const API_BASE_URL = 'http://localhost:8080';

// Test 1: Check if backend is running
async function testBackendRunning() {
  console.log('🔍 Testing if backend is running...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/lessons/test`);
    console.log('Backend test response:', response.status);
    
    if (response.ok) {
      const text = await response.text();
      console.log('✅ Backend is running:', text);
    } else {
      console.log('❌ Backend test failed:', response.status);
    }
  } catch (error) {
    console.error('❌ Backend not reachable:', error);
  }
}

// Test 2: Check lessons without any headers
async function testLessonsSimple() {
  console.log('\n🔍 Testing lessons endpoint with minimal request...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/lessons`);
    console.log('Lessons response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Lessons accessible:', data.length, 'lessons found');
      console.log('Lessons:', data);
    } else {
      const errorText = await response.text();
      console.log('❌ Lessons not accessible:', errorText);
    }
  } catch (error) {
    console.error('❌ Error accessing lessons:', error);
  }
}

// Test 3: Check if user exists
async function testUserExists() {
  console.log('\n🔍 Testing if user SaraLe exists...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/check-user/SaraLe`);
    console.log('User check response status:', response.status);
    
    if (response.ok) {
      const text = await response.text();
      console.log('User check result:', text);
    } else {
      console.log('❌ User check failed:', response.status);
    }
  } catch (error) {
    console.error('❌ Error checking user:', error);
  }
}

// Run all simple tests
async function runSimpleTests() {
  console.log('🧪 Running simple backend tests...');
  console.log('=====================================');
  
  await testBackendRunning();
  await testLessonsSimple();
  await testUserExists();
  
  console.log('\n=====================================');
  console.log('✅ Simple tests completed!');
}

// Run tests
console.log('Simple test functions loaded. Run runSimpleTests() to test the backend.'); 