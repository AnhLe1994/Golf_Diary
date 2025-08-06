# Golf Diary Frontend

A React frontend for the Golf Diary Spring Boot backend application. This application provides a user-friendly interface for managing golf lessons and tracking progress.

## Features

- 🔐 **Authentication**: Secure login with JWT token management
- 📱 **Responsive Design**: Modern UI built with Tailwind CSS
- 🛡️ **Protected Routes**: Automatic redirection for unauthenticated users
- 📊 **Dashboard**: View and manage golf lessons
- 🔄 **Real-time Updates**: Automatic token refresh and error handling

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Spring Boot backend running on `http://localhost:8080`

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── LoginPage.js          # Login form with authentication
│   ├── DashboardPage.js      # Main dashboard with lessons list
│   └── ProtectedRoute.js     # Route protection component
├── contexts/
│   └── AuthContext.js        # Authentication context and hooks
├── services/
│   └── api.js               # API service with Axios configuration
├── App.js                   # Main app component with routing
├── index.js                 # React entry point
└── index.css               # Global styles with Tailwind CSS
```

## API Endpoints

The frontend communicates with the following Spring Boot endpoints:

- `POST /api/auth/login` - User authentication
- `GET /api/lessons` - Fetch user's golf lessons

## Authentication Flow

1. **Login**: User enters email and password
2. **Token Storage**: JWT token is saved in localStorage
3. **Protected Access**: All dashboard routes require authentication
4. **Auto Logout**: Token expiration triggers automatic logout

## Styling

This project uses **Tailwind CSS** for styling with:
- Responsive design
- Modern UI components
- Consistent color scheme
- Loading states and error handling

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Configuration

### Backend URL
The API base URL is configured in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8080';
```

### CORS
Ensure your Spring Boot backend has CORS configured to allow requests from `http://localhost:3000`.

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your Spring Boot backend has proper CORS configuration
2. **Authentication Failures**: Verify the login endpoint returns the expected JWT token format
3. **API Connection**: Ensure the backend is running on port 8080

### Development Tips

- Use browser dev tools to inspect network requests
- Check localStorage for JWT token storage
- Monitor console for error messages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 