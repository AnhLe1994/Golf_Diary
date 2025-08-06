# Golf Diary Backend

A Spring Boot backend application for the Golf Diary project with MySQL database integration and JWT authentication.

## Features

- User authentication and registration with JWT tokens
- Golf round management (CRUD operations)
- MySQL database integration
- RESTful API endpoints
- CORS configuration for frontend integration

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- MySQL 8.0 or higher

## Database Setup

1. Install and start MySQL server
2. Create a database named `golf_diary` (or update the application.properties)
3. Update database credentials in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

## Running the Application

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

The application will start on `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/test` - Test endpoint

### Golf Rounds
- `GET /api/golf-rounds` - Get all rounds for current user
- `GET /api/golf-rounds/{id}` - Get specific round
- `POST /api/golf-rounds` - Create new round
- `PUT /api/golf-rounds/{id}` - Update round
- `DELETE /api/golf-rounds/{id}` - Delete round
- `GET /api/golf-rounds/course/{courseName}` - Get rounds by course
- `GET /api/golf-rounds/date-range?startDate=...&endDate=...` - Get rounds by date range

## Authentication

All endpoints except `/api/auth/**` require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Database Schema

The application uses JPA/Hibernate with automatic schema generation. The main entities are:

- **users**: User accounts with authentication details
- **golf_rounds**: Golf round records linked to users

## Configuration

Key configuration properties in `application.properties`:
- Database connection settings
- JWT secret and expiration
- CORS settings for frontend integration
- Server port (default: 8080) 