import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { publicLessonsAPI } from '../services/publicApi';

const StudentDashboard = () => {
  const [lessons, setLessons] = useState([]);
  const [golfRounds, setGolfRounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('lessons');
  const [retryCount, setRetryCount] = useState(0);
  
  const { logout, username } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        
        console.log('Fetching lessons from MySQL database...');
        console.log('JWT Token:', localStorage.getItem('jwt_token'));
        console.log('Username:', username);
        console.log('User Role:', localStorage.getItem('user_role'));
        
        // Fetch lessons from the real MySQL database via API
        const lessonsData = await publicLessonsAPI.getLessons();
        
        console.log('Raw lessons response from database:', lessonsData);
        console.log('Lessons data type:', typeof lessonsData);
        console.log('Lessons is array:', Array.isArray(lessonsData));
        console.log('Lessons array length:', lessonsData?.length || 0);
        
        // Debug: Log the first lesson structure if available
        if (Array.isArray(lessonsData) && lessonsData.length > 0) {
          console.log('First lesson structure:', lessonsData[0]);
          console.log('First lesson published field:', lessonsData[0].published);
          console.log('First lesson isPublished field:', lessonsData[0].isPublished);
        }
        
        // Show all lessons (both published and unpublished)
        const allLessons = Array.isArray(lessonsData) ? lessonsData : [];
        
        console.log('All lessons from database:', allLessons);
        console.log('Total lessons count:', allLessons.length);
        
        setLessons(allLessons);
        setGolfRounds([]); // For now, we'll keep golf rounds empty
      } catch (err) {
        console.error('Error fetching lessons from database:', err);
        console.error('Error details:', {
          message: err.message,
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data
        });
        
        if (err.response?.status === 401) {
          setError('Authentication failed. Please log in again.');
        } else if (err.response?.status === 404) {
          setError('API endpoints not found. Please check if the backend server is running.');
        } else if (err.code === 'ERR_NETWORK') {
          setError('Network error. Please check if the backend server is running on http://localhost:8080');
        } else if (err.response?.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(`Failed to fetch lessons from database: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [retryCount]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setError('');
    setLoading(true);
    // This will trigger the useEffect to run again
  };

  // Helper function to convert YouTube URL to embed URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    
    // Handle different YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    
    return url; // Return original URL if not a valid YouTube URL
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img src="/golf-diary_logo.png" alt="Golf Diary Logo" className="h-8 w-auto mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Student</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {username}!</span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      You are logged in as a Student!
                    </p>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('lessons')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'lessons'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Golf Lessons
                  </button>
                  <button
                    onClick={() => setActiveTab('rounds')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'rounds'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    My Golf Rounds
                  </button>
                </nav>
              </div>

              {loading && (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              )}

                             {error && (
                 <div className="rounded-md bg-red-50 p-4 mb-4">
                   <div className="flex items-start">
                     <div className="flex-shrink-0">
                       <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm8.707-7.293a1 1 0 00-1.414-1.414L11 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                       </svg>
                     </div>
                     <div className="ml-3 flex-1">
                       <div className="text-sm text-red-700">{error}</div>
                       <div className="mt-2">
                         <button
                           onClick={handleRetry}
                           className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                         >
                           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                           </svg>
                           Retry
                         </button>
                       </div>
                     </div>
                   </div>
                 </div>
               )}

              {/* Lessons Tab */}
              {!loading && activeTab === 'lessons' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Available Golf Lessons</h3>
                  
                                     {lessons.length === 0 ? (
                     <div className="text-center py-8">
                       <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                       </svg>
                       <h3 className="mt-2 text-sm font-medium text-gray-900">No lessons available</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          No lessons are currently available in the database. 
                          <br />
                          Lessons will appear here once instructors create them.
                        </p>
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-700">
                            <strong>Note:</strong> All lessons from the MySQL database are shown here, including both published and draft lessons.
                          </p>
                        </div>
                     </div>
                  ) : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                      <ul className="divide-y divide-gray-200">
                                                 {lessons.map((lesson, index) => (
                           <li key={lesson.id || index}>
                             <div className="px-6 py-6">
                               <div className="flex items-start justify-between">
                                 <div className="flex-1">
                                   <div className="flex items-center mb-3">
                                     <div className="flex-shrink-0">
                                       <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                         <svg className="h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                         </svg>
                                       </div>
                                     </div>
                                     <div className="ml-4 flex-1">
                                       <div className="flex items-center justify-between">
                                         <div>
                                           <h3 className="text-lg font-semibold text-gray-900">
                                             {lesson.title || `Lesson ${index + 1}`}
                                           </h3>
                                           <div className="flex items-center mt-1 space-x-4">
                                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                               {lesson.category}
                                             </span>
                                             <span className="text-sm text-gray-500">
                                               {lesson.level}
                                             </span>
                                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                               lesson.published 
                                                 ? 'bg-green-100 text-green-800' 
                                                 : 'bg-yellow-100 text-yellow-800'
                                             }`}>
                                               {lesson.published ? 'Published' : 'Draft'}
                                             </span>
                                           </div>
                                         </div>
                                       </div>
                                     </div>
                                   </div>
                                   
                                   {lesson.description && (
                                     <div className="mb-4">
                                       <p className="text-sm text-gray-600 leading-relaxed">
                                         {lesson.description}
                                       </p>
                                     </div>
                                   )}
                                   
                                   {lesson.videoUrl && (
                                     <div className="mb-4">
                                       <div className="text-sm font-medium text-gray-700 mb-2">Video:</div>
                                       <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                                         <iframe
                                           src={getYouTubeEmbedUrl(lesson.videoUrl)}
                                           title="Lesson Video"
                                           className="w-full h-full"
                                           frameBorder="0"
                                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                           allowFullScreen
                                         ></iframe>
                                       </div>
                                     </div>
                                   )}
                                   
                                   {lesson.content && (
                                     <div className="mb-4">
                                       <div className="text-sm font-medium text-gray-700 mb-2">Content:</div>
                                       <div className="bg-gray-50 rounded-lg p-4">
                                         <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                                           {lesson.content}
                                         </p>
                                       </div>
                                     </div>
                                   )}
                                 </div>
                                 
                                 {lesson.createdAt && (
                                   <div className="ml-4 text-sm text-gray-500">
                                     {new Date(lesson.createdAt).toLocaleDateString()}
                                   </div>
                                 )}
                               </div>
                             </div>
                           </li>
                         ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Golf Rounds Tab */}
              {!loading && activeTab === 'rounds' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Your Golf Rounds</h3>
                  
                                     {golfRounds.length === 0 ? (
                     <div className="text-center py-8">
                       <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                       </svg>
                       <h3 className="mt-2 text-sm font-medium text-gray-900">No golf rounds found</h3>
                       <p className="mt-1 text-sm text-gray-500">
                         You haven't recorded any golf rounds yet.
                         <br />
                         Track your progress by adding your golf rounds here.
                       </p>
                       <div className="mt-4 p-4 bg-green-50 rounded-lg">
                         <p className="text-sm text-green-700">
                           <strong>Coming Soon:</strong> Golf round tracking feature will be available soon!
                         </p>
                       </div>
                     </div>
                  ) : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                      <ul className="divide-y divide-gray-200">
                        {golfRounds.map((round, index) => (
                          <li key={round.id || index}>
                            <div className="px-4 py-4 sm:px-6">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                      </svg>
                                    </div>
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {round.courseName || `Round ${index + 1}`}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      Score: {round.totalScore} (Par: {round.par})
                                    </div>
                                    {round.weather && (
                                      <div className="text-sm text-gray-500">
                                        Weather: {round.weather}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                {round.roundDate && (
                                  <div className="text-sm text-gray-500">
                                    {new Date(round.roundDate).toLocaleDateString()}
                                  </div>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 