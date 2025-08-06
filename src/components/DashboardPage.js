import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import StudentDashboard from './StudentDashboard';
import InstructorDashboard from './InstructorDashboard';

const DashboardPage = () => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  // Route to appropriate dashboard based on user role
  if (userRole === 'INSTRUCTOR') {
    return <InstructorDashboard />;
  } else {
    return <StudentDashboard />;
  }
};

export default DashboardPage; 