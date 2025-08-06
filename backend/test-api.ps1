# Test script for Golf Diary Backend API
Write-Host "Testing Golf Diary Backend API with MySQL" -ForegroundColor Green

# Wait for application to start
Write-Host "Waiting for application to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Test 1: Register a new user
Write-Host "`n1. Testing User Registration..." -ForegroundColor Cyan
$registerBody = @{
    username = "testuser"
    email = "test@example.com"
    password = "password123"
    firstName = "Test"
    lastName = "User"
} | ConvertTo-Json

try {
    $registerResponse = Invoke-WebRequest -Uri "http://localhost:8080/api/auth/register" -Method POST -ContentType "application/json" -Body $registerBody
    Write-Host "✅ Registration successful!" -ForegroundColor Green
    Write-Host "Response: $($registerResponse.Content)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Registration failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Login with the registered user
Write-Host "`n2. Testing User Login..." -ForegroundColor Cyan
$loginBody = @{
    username = "testuser"
    password = "password123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-WebRequest -Uri "http://localhost:8080/api/auth/login" -Method POST -ContentType "application/json" -Body $loginBody
    Write-Host "✅ Login successful!" -ForegroundColor Green
    Write-Host "Response: $($loginResponse.Content)" -ForegroundColor Gray
    
    # Extract JWT token
    $loginData = $loginResponse.Content | ConvertFrom-Json
    $jwtToken = $loginData.token
    Write-Host "JWT Token received: $($jwtToken.Substring(0, 50))..." -ForegroundColor Gray
} catch {
    Write-Host "❌ Login failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Access protected endpoint with JWT token
Write-Host "`n3. Testing Protected Endpoint..." -ForegroundColor Cyan
if ($jwtToken) {
    try {
        $headers = @{
            "Authorization" = "Bearer $jwtToken"
            "Content-Type" = "application/json"
        }
        $protectedResponse = Invoke-WebRequest -Uri "http://localhost:8080/api/golf-rounds" -Method GET -Headers $headers
        Write-Host "✅ Protected endpoint access successful!" -ForegroundColor Green
        Write-Host "Response: $($protectedResponse.Content)" -ForegroundColor Gray
    } catch {
        Write-Host "❌ Protected endpoint access failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Test 4: Create a golf round
Write-Host "`n4. Testing Golf Round Creation..." -ForegroundColor Cyan
if ($jwtToken) {
    $golfRoundBody = @{
        courseName = "Pine Valley Golf Club"
        roundDate = "2025-08-06T10:00:00"
        totalScore = 85
        par = 72
        birdies = 1
        pars = 8
        bogeys = 7
        doubleBogeys = 2
        other = 0
        weather = "Sunny"
        notes = "Great round today!"
    } | ConvertTo-Json

    try {
        $headers = @{
            "Authorization" = "Bearer $jwtToken"
            "Content-Type" = "application/json"
        }
        $golfRoundResponse = Invoke-WebRequest -Uri "http://localhost:8080/api/golf-rounds" -Method POST -Headers $headers -Body $golfRoundBody
        Write-Host "✅ Golf round creation successful!" -ForegroundColor Green
        Write-Host "Response: $($golfRoundResponse.Content)" -ForegroundColor Gray
    } catch {
        Write-Host "❌ Golf round creation failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n🎉 API Testing Complete!" -ForegroundColor Green
Write-Host "Check MySQL Workbench to see the data in the golf_diary database." -ForegroundColor Yellow 