# 🚀 Frontend-Backend Integration Test Guide

## ✅ Current Status
- ✅ Spring Boot Backend: Running on http://localhost:8080
- ✅ React Frontend: Running on http://localhost:3000
- ✅ MySQL Database: Connected and ready
- ✅ JWT Authentication: Configured and working

## 🧪 Complete Flow Testing

### Step 1: Test Registration Flow

1. **Open your browser** and go to: `http://localhost:3000`
2. **Click "Sign up"** to go to the registration page
3. **Fill out the registration form:**
   - Username: `testuser`
   - Email: `test@example.com`
   - First Name: `Test`
   - Last Name: `User`
   - Password: `password123`
   - Confirm Password: `password123`
4. **Click "Create account"**
5. **Expected Result:** You should be redirected to the login page with a success message

### Step 2: Test Login Flow

1. **On the login page**, enter:
   - Username: `testuser`
   - Password: `password123`
2. **Click "Sign in"**
3. **Expected Result:** You should be redirected to the dashboard with a success message

### Step 3: Test Dashboard

1. **On the dashboard**, you should see:
   - ✅ "You are logged in!" message
   - ✅ "Your Golf Rounds" section
   - ✅ "No golf rounds found" message (initially empty)

### Step 4: Test API Endpoints (Optional)

You can also test the API directly using curl or Postman:

#### Test Registration:
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser2",
    "email": "test2@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User2"
  }'
```

#### Test Login:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

## 🔍 Verify in MySQL Workbench

1. **Open MySQL Workbench**
2. **Connect to your database:**
   - Host: `localhost`
   - Port: `3306`
   - Username: `root`
   - Password: `9898`
3. **Run these queries:**

```sql
-- Check if database exists
SHOW DATABASES;

-- Use the golf_diary database
USE golf_diary;

-- Check tables
SHOW TABLES;

-- Check users table
SELECT * FROM users;

-- Check golf_rounds table
SELECT * FROM golf_rounds;
```

## 🎯 Expected Results

### ✅ Successful Registration:
- User data saved in MySQL `users` table
- Password encrypted with BCrypt
- Redirect to login page with success message

### ✅ Successful Login:
- JWT token generated and stored in localStorage
- Redirect to dashboard
- User authenticated for protected routes

### ✅ Dashboard Display:
- Shows user's golf rounds (initially empty)
- Displays user authentication status
- Logout functionality works

## 🛠️ Troubleshooting

### If Registration Fails:
1. Check browser console for errors
2. Verify backend is running on port 8080
3. Check MySQL connection
4. Ensure all required fields are filled

### If Login Fails:
1. Verify user exists in database
2. Check password is correct
3. Ensure JWT token is generated
4. Check browser console for errors

### If Dashboard Doesn't Load:
1. Verify JWT token is stored in localStorage
2. Check if backend is responding to API calls
3. Ensure CORS is properly configured

## 📊 Database Schema

### Users Table:
```sql
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  phone_number VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Golf Rounds Table:
```sql
CREATE TABLE golf_rounds (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  course_name VARCHAR(100) NOT NULL,
  round_date DATETIME NOT NULL,
  total_score INT,
  par INT,
  birdies INT,
  pars INT,
  bogeys INT,
  double_bogeys INT,
  other INT,
  weather VARCHAR(50),
  notes TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 🎉 Success Indicators

- ✅ Frontend connects to backend successfully
- ✅ Registration creates user in MySQL database
- ✅ Login generates JWT token
- ✅ Dashboard displays user data
- ✅ Protected routes work with JWT authentication
- ✅ Logout clears authentication state

Your Golf Diary application is now fully connected and ready to use! 🚀 