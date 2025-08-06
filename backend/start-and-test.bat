@echo off
echo Starting Golf Diary Backend Application...
echo.

REM Start the Spring Boot application in background
start /B .\apache-maven-3.9.5\bin\mvn.cmd spring-boot:run

echo Waiting for application to start...
timeout /t 15 /nobreak > nul

echo.
echo Testing API endpoints...
echo.

REM Test registration
echo 1. Testing User Registration...
curl -X POST http://localhost:8080/api/auth/register -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"password123\",\"firstName\":\"Test\",\"lastName\":\"User\"}"
echo.
echo.

REM Test login
echo 2. Testing User Login...
curl -X POST http://localhost:8080/api/auth/login -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"password\":\"password123\"}"
echo.
echo.

echo API Testing Complete!
echo Check MySQL Workbench to see the data in the golf_diary database.
echo.
pause 