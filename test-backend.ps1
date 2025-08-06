# Test Backend Script
Write-Host "Testing Backend Endpoints..." -ForegroundColor Green

# Test 1: Check if backend is running
Write-Host "`n1. Testing if backend is running..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/auth/test" -Method GET
    Write-Host "✓ Backend is running (Status: $($response.StatusCode))" -ForegroundColor Green
} catch {
    Write-Host "✗ Backend is not running. Please start the backend first." -ForegroundColor Red
    exit 1
}

# Test 2: Test lessons endpoint (should work without authentication)
Write-Host "`n2. Testing lessons endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/lessons" -Method GET -Headers @{"Content-Type"="application/json"}
    Write-Host "✓ Lessons endpoint is working (Status: $($response.StatusCode))" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Lessons endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Test registration endpoint
Write-Host "`n3. Testing registration endpoint..." -ForegroundColor Yellow
$registerData = @{
    username = "teststudent"
    email = "teststudent@example.com"
    password = "password123"
    firstName = "Test"
    lastName = "Student"
    role = "STUDENT"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/auth/register" -Method POST -Body $registerData -Headers @{"Content-Type"="application/json"}
    Write-Host "✓ Registration successful (Status: $($response.StatusCode))" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Registration failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nBackend testing completed!" -ForegroundColor Green 