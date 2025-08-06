// Test to verify backend without JWT
// Run this in the browser console

const API_BASE_URL = 'http://localhost:8080';

// Test 1: Direct fetch without any headers
async function testDirectFetch() {
  console.log('🔍 Test 1: Direct fetch without any headers');
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/lessons`);
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
    console.error('❌ Error:', error);
  }
}

// Test 2: Check if backend is running
async function testBackendHealth() {
  console.log('\n🔍 Test 2: Backend health check');
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/lessons/test`);
    console.log('Health response status:', response.status);
    
    if (response.ok) {
      const text = await response.text();
      console.log('✅ Backend is healthy:', text);
    } else {
      console.log('❌ Backend health check failed:', response.status);
    }
  } catch (error) {
    console.error('❌ Backend not reachable:', error);
  }
}

// Test 3: Check database debug
async function testDatabaseDebug() {
  console.log('\n🔍 Test 3: Database debug');
  
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
async function runNoJWTTests() {
  console.log('🧪 Running tests without JWT...');
  console.log('=====================================');
  
  await testBackendHealth();
  await testDatabaseDebug();
  await testDirectFetch();
  
  console.log('\n=====================================');
  console.log('✅ All tests completed!');
}

// Run tests
console.log('No JWT test functions loaded. Run runNoJWTTests() to test.'); 