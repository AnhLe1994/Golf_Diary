// Test script to debug student lessons issue
// Run this in the browser console to test the API calls

const API_BASE_URL = 'http://localhost:8080';

// Test function to check student lessons
async function testStudentLessons() {
  console.log('=== Testing Student Lessons ===');
  
  try {
    // Test the lessons endpoint (should be public)
    console.log('\n=== Testing Public Lessons Endpoint ===');
    const lessonsResponse = await fetch(`${API_BASE_URL}/api/lessons`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('Lessons response status:', lessonsResponse.status);
    console.log('Lessons response headers:', Object.fromEntries(lessonsResponse.headers.entries()));
    
    if (lessonsResponse.ok) {
      const lessonsData = await lessonsResponse.json();
      console.log('Lessons data:', lessonsData);
      console.log('Number of lessons:', lessonsData.length);
      
      // Check if lessons are published
      const publishedLessons = lessonsData.filter(lesson => lesson.isPublished === true);
      console.log('Published lessons:', publishedLessons.length);
      
      if (publishedLessons.length === 0) {
        console.log('⚠️  No published lessons found!');
        console.log('All lessons:', lessonsData);
      }
    } else {
      const errorText = await lessonsResponse.text();
      console.log('Lessons error:', errorText);
    }
  } catch (error) {
    console.error('Test error:', error);
  }
}

// Test function to check database debug info
async function testDatabaseDebug() {
  console.log('=== Testing Database Debug ===');
  
  try {
    const debugResponse = await fetch(`${API_BASE_URL}/api/lessons/debug`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('Debug response status:', debugResponse.status);
    
    if (debugResponse.ok) {
      const debugData = await debugResponse.text();
      console.log('Database debug info:', debugData);
    } else {
      const errorText = await debugResponse.text();
      console.log('Debug error:', errorText);
    }
  } catch (error) {
    console.error('Debug test error:', error);
  }
}

// Test function to check if backend is running
async function testBackendHealth() {
  console.log('=== Testing Backend Health ===');
  
  try {
    const healthResponse = await fetch(`${API_BASE_URL}/api/lessons/test`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('Health response status:', healthResponse.status);
    
    if (healthResponse.ok) {
      const healthData = await healthResponse.text();
      console.log('Backend health:', healthData);
    } else {
      const errorText = await healthResponse.text();
      console.log('Health error:', errorText);
    }
  } catch (error) {
    console.error('Health test error:', error);
  }
}

// Run all tests
async function runAllTests() {
  console.log('🧪 Running all student lesson tests...');
  
  await testBackendHealth();
  await testDatabaseDebug();
  await testStudentLessons();
  
  console.log('✅ All tests completed!');
}

// Run tests
console.log('Student lesson test functions loaded. Run testStudentLessons(), testDatabaseDebug(), testBackendHealth(), or runAllTests() to test.'); 