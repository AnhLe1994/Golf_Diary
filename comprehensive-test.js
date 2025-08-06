// Comprehensive test to debug the 403 issue
// Run this in the browser console

const API_BASE_URL = 'http://localhost:8080';

// Test 1: Check if backend is running
async function testBackendRunning() {
  console.log('🔍 Test 1: Checking if backend is running...');
  
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

// Test 2: Check public test endpoint
async function testPublicEndpoint() {
  console.log('\n🔍 Test 2: Testing public endpoint...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/lessons/public-test`);
    console.log('Public test response:', response.status);
    
    if (response.ok) {
      const text = await response.text();
      console.log('✅ Public endpoint works:', text);
    } else {
      console.log('❌ Public endpoint failed:', response.status);
    }
  } catch (error) {
    console.error('❌ Public endpoint error:', error);
  }
}

// Test 3: Check lessons endpoint with different approaches
async function testLessonsEndpoint() {
  console.log('\n🔍 Test 3: Testing lessons endpoint...');
  
  // Test 3a: Direct fetch without headers
  try {
    console.log('3a. Testing with no headers...');
    const response1 = await fetch(`${API_BASE_URL}/api/lessons`);
    console.log('Response 1 status:', response1.status);
    
    if (response1.ok) {
      const data1 = await response1.json();
      console.log('✅ Success with no headers:', data1.length, 'lessons');
    } else {
      const error1 = await response1.text();
      console.log('❌ Failed with no headers:', error1);
    }
  } catch (error) {
    console.error('❌ Error with no headers:', error);
  }
  
  // Test 3b: With Content-Type header only
  try {
    console.log('\n3b. Testing with Content-Type header...');
    const response2 = await fetch(`${API_BASE_URL}/api/lessons`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log('Response 2 status:', response2.status);
    
    if (response2.ok) {
      const data2 = await response2.json();
      console.log('✅ Success with Content-Type:', data2.length, 'lessons');
    } else {
      const error2 = await response2.text();
      console.log('❌ Failed with Content-Type:', error2);
    }
  } catch (error) {
    console.error('❌ Error with Content-Type:', error);
  }
  
  // Test 3c: With Authorization header (simulating JWT)
  try {
    console.log('\n3c. Testing with Authorization header...');
    const response3 = await fetch(`${API_BASE_URL}/api/lessons`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token'
      }
    });
    console.log('Response 3 status:', response3.status);
    
    if (response3.ok) {
      const data3 = await response3.json();
      console.log('✅ Success with Authorization:', data3.length, 'lessons');
    } else {
      const error3 = await response3.text();
      console.log('❌ Failed with Authorization:', error3);
    }
  } catch (error) {
    console.error('❌ Error with Authorization:', error);
  }
}

// Test 4: Check database debug
async function testDatabaseDebug() {
  console.log('\n🔍 Test 4: Testing database debug...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/lessons/debug`);
    console.log('Debug response status:', response.status);
    
    if (response.ok) {
      const text = await response.text();
      console.log('Database debug info:', text);
    } else {
      console.log('❌ Database debug failed:', response.status);
    }
  } catch (error) {
    console.error('❌ Database debug error:', error);
  }
}

// Run all tests
async function runComprehensiveTests() {
  console.log('🧪 Running comprehensive tests...');
  console.log('=====================================');
  
  await testBackendRunning();
  await testPublicEndpoint();
  await testLessonsEndpoint();
  await testDatabaseDebug();
  
  console.log('\n=====================================');
  console.log('✅ All comprehensive tests completed!');
}

// Run tests
console.log('Comprehensive test functions loaded. Run runComprehensiveTests() to test.'); 