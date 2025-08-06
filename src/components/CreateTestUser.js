import React, { useState } from 'react';
import { authAPI } from '../services/api';

const CreateTestUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleCreateTestUser = async () => {
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await authAPI.createTestUser();
      setMessage(`✅ ${response.message}`);
    } catch (err) {
      setError(err.response?.data || 'Failed to create test user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Create Test User</h3>
      <p className="text-sm text-gray-600 mb-4">
        Create a test user for development purposes.
      </p>
      
      <button
        onClick={handleCreateTestUser}
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creating...' : 'Create Test User'}
      </button>

      {message && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-700">{message}</p>
          <p className="text-xs text-green-600 mt-1">
            Email: test@example.com | Password: password123
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
};

export default CreateTestUser; 