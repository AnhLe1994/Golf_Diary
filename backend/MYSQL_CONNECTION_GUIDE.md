# MySQL Connection and API Testing Guide

## ✅ Spring Boot Backend Status
Your Spring Boot backend is successfully configured and ready to connect to MySQL!

## 🔧 Database Configuration
- **Database URL**: `jdbc:mysql://localhost:3306/golf_diary`
- **Username**: `root`
- **Password**: `9898`
- **Auto-create database**: ✅ Enabled
- **Auto-create tables**: ✅ Enabled

## 📊 Expected Database Tables
When the application starts, it will automatically create:
1. `users` table - for user authentication
2. `golf_rounds` table - for storing golf round data

## 🚀 How to Test the Complete Flow

### Step 1: Start the Application
```bash
cd backend
.\apache-maven-3.9.5\bin\mvn.cmd spring-boot:run
```

### Step 2: Verify Application is Running
Look for these success messages:
- ✅ `Tomcat started on port 8080 (http)`
- ✅ `HikariPool-1 - Start completed` (MySQL connection)
- ✅ `Initialized JPA EntityManagerFactory` (Database tables created)

### Step 3: Test Registration API
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com", 
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

**Expected Response:**
```json
{
  "message": "User registered successfully"
}
```

### Step 4: Test Login API
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "username": "testuser"
}
```

### Step 5: Test Protected Endpoint
```bash
curl -X GET http://localhost:8080/api/golf-rounds \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

## 🔍 Verify in MySQL Workbench

### 1. Connect to MySQL
- Host: `localhost`
- Port: `3306`
- Username: `root`
- Password: `9898`

### 2. Check Database
```sql
USE golf_diary;
SHOW TABLES;
```

### 3. Check User Data
```sql
SELECT * FROM users;
```

### 4. Check Golf Rounds
```sql
SELECT * FROM golf_rounds;
```

## 🎯 Complete Flow Verification

### Registration Flow:
1. ✅ User submits registration form
2. ✅ Backend validates data
3. ✅ Password is encrypted with BCrypt
4. ✅ User is saved to MySQL database
5. ✅ Response sent to frontend

### Login Flow:
1. ✅ User submits login credentials
2. ✅ Backend validates username/password
3. ✅ JWT token is generated
4. ✅ Token is sent to frontend
5. ✅ Frontend stores token for future requests

### Protected Endpoints:
1. ✅ Frontend includes JWT token in Authorization header
2. ✅ Backend validates JWT token
3. ✅ User data is retrieved from MySQL
4. ✅ Response is sent to frontend

## 🛠️ Troubleshooting

### If MySQL Connection Fails:
1. Ensure MySQL is running
2. Verify credentials in `application.properties`
3. Check if port 3306 is available

### If Registration Fails:
1. Check if username/email already exists
2. Verify all required fields are provided
3. Check application logs for validation errors

### If Login Fails:
1. Verify user exists in database
2. Check password is correct
3. Ensure JWT secret is configured

## 📝 API Endpoints Summary

| Endpoint | Method | Description | Authentication |
|----------|--------|-------------|----------------|
| `/api/auth/register` | POST | Register new user | No |
| `/api/auth/login` | POST | Login user | No |
| `/api/golf-rounds` | GET | Get user's golf rounds | Yes (JWT) |
| `/api/golf-rounds` | POST | Create new golf round | Yes (JWT) |

## 🎉 Success Indicators
- ✅ Spring Boot application starts without errors
- ✅ MySQL connection established
- ✅ Database tables created automatically
- ✅ Registration API returns success message
- ✅ Login API returns JWT token
- ✅ Protected endpoints work with JWT token
- ✅ Data appears in MySQL Workbench

Your backend is now fully connected to MySQL and ready for frontend integration! 🚀 