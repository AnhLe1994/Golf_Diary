import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { lessonsAPI } from '../services/api';

const InstructorDashboard = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [newLesson, setNewLesson] = useState({
    title: '',
    description: '',
    content: '',
    videoUrl: '',
    category: 'TECHNIQUE',
    level: 'BEGINNER'
  });
  
  const { logout, username } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchInstructorLessons();
  }, []);

  const fetchInstructorLessons = async () => {
    try {
      setLoading(true);
      const data = await lessonsAPI.getInstructorLessons();
      setLessons(data);
    } catch (err) {
      setError('Failed to fetch lessons. Please try again.');
      console.error('Error fetching lessons:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLesson = async (e) => {
    e.preventDefault();
    try {
      await lessonsAPI.createLesson(newLesson);
      setShowCreateForm(false);
      setNewLesson({
        title: '',
        description: '',
        content: '',
        videoUrl: '',
        category: 'TECHNIQUE',
        level: 'BEGINNER'
      });
      fetchInstructorLessons();
    } catch (err) {
      setError('Failed to create lesson. Please try again.');
    }
  };

  const handlePublishLesson = async (lessonId) => {
    try {
      await lessonsAPI.publishLesson(lessonId);
      fetchInstructorLessons();
    } catch (err) {
      setError('Failed to publish lesson. Please try again.');
    }
  };

  const handleUnpublishLesson = async (lessonId) => {
    try {
      await lessonsAPI.unpublishLesson(lessonId);
      fetchInstructorLessons();
    } catch (err) {
      setError('Failed to unpublish lesson. Please try again.');
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      try {
        await lessonsAPI.deleteLesson(lessonId);
        fetchInstructorLessons();
      } catch (err) {
        setError('Failed to delete lesson. Please try again.');
      }
    }
  };

  const handleEditLesson = (lesson) => {
    setEditingLesson(lesson);
    setNewLesson({
      title: lesson.title || '',
      description: lesson.description || '',
      content: lesson.content || '',
      videoUrl: lesson.videoUrl || '',
      category: lesson.category || 'TECHNIQUE',
      level: lesson.level || 'BEGINNER'
    });
    setShowCreateForm(false);
  };

  const handleUpdateLesson = async (e) => {
    e.preventDefault();
    try {
      await lessonsAPI.updateLesson(editingLesson.id, newLesson);
      setEditingLesson(null);
      setShowCreateForm(false);
      setNewLesson({
        title: '',
        description: '',
        content: '',
        videoUrl: '',
        category: 'TECHNIQUE',
        level: 'BEGINNER'
      });
      fetchInstructorLessons();
    } catch (err) {
      setError('Failed to update lesson. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditingLesson(null);
    setNewLesson({
      title: '',
      description: '',
      content: '',
      videoUrl: '',
      category: 'TECHNIQUE',
      level: 'BEGINNER'
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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
              <h1 className="text-xl font-semibold text-gray-900">Instructor</h1>
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
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-blue-800">
                      You are logged in as an Instructor!
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">My Lessons</h3>
                <button
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {showCreateForm ? 'Cancel' : 'Create New Lesson'}
                </button>
              </div>

                             {/* Create/Edit Lesson Form */}
               {(showCreateForm || editingLesson) && (
                 <div className="bg-gray-50 p-6 rounded-lg mb-6">
                   <h4 className="text-lg font-medium text-gray-900 mb-4">
                     {editingLesson ? 'Edit Lesson' : 'Create New Lesson'}
                   </h4>
                   <form onSubmit={editingLesson ? handleUpdateLesson : handleCreateLesson} className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={newLesson.title}
                        onChange={(e) => setNewLesson({...newLesson, title: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        id="description"
                        value={newLesson.description}
                        onChange={(e) => setNewLesson({...newLesson, description: e.target.value})}
                        rows={3}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                                         <div>
                       <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                         Content
                       </label>
                       <textarea
                         id="content"
                         value={newLesson.content}
                         onChange={(e) => setNewLesson({...newLesson, content: e.target.value})}
                         rows={6}
                         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                         required
                       />
                     </div>
                     
                     <div>
                       <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">
                         Video URL (YouTube)
                       </label>
                       <input
                         type="url"
                         id="videoUrl"
                         value={newLesson.videoUrl}
                         onChange={(e) => setNewLesson({...newLesson, videoUrl: e.target.value})}
                         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                         placeholder="https://www.youtube.com/watch?v=..."
                       />
                       <p className="mt-1 text-xs text-gray-500">
                         Optional: Add a YouTube video URL to embed in the lesson
                       </p>
                     </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                          Category
                        </label>
                        <select
                          id="category"
                          value={newLesson.category}
                          onChange={(e) => setNewLesson({...newLesson, category: e.target.value})}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="TECHNIQUE">Technique</option>
                          <option value="PUTTING">Putting</option>
                          <option value="DRIVING">Driving</option>
                          <option value="IRON_PLAY">Iron Play</option>
                          <option value="CHIPPING">Chipping</option>
                          <option value="PITCHING">Pitching</option>
                          <option value="BUNKER_PLAY">Bunker Play</option>
                          <option value="COURSE_MANAGEMENT">Course Management</option>
                          <option value="MENTAL_GAME">Mental Game</option>
                          <option value="FITNESS">Fitness</option>
                          <option value="EQUIPMENT">Equipment</option>
                          <option value="RULES">Rules</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                          Level
                        </label>
                        <select
                          id="level"
                          value={newLesson.level}
                          onChange={(e) => setNewLesson({...newLesson, level: e.target.value})}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="BEGINNER">Beginner</option>
                          <option value="INTERMEDIATE">Intermediate</option>
                          <option value="ADVANCED">Advanced</option>
                          <option value="EXPERT">Expert</option>
                        </select>
                      </div>
                    </div>
                    
                                         <div className="flex justify-end space-x-3">
                       <button
                         type="button"
                         onClick={editingLesson ? handleCancelEdit : () => setShowCreateForm(false)}
                         className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                       >
                         Cancel
                       </button>
                       <button
                         type="submit"
                         className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                       >
                         {editingLesson ? 'Update Lesson' : 'Create Lesson'}
                       </button>
                     </div>
                  </form>
                </div>
              )}

              {loading && (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              )}

              {error && (
                <div className="rounded-md bg-red-50 p-4 mb-4">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}

              {!loading && lessons.length === 0 ? (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No lessons created</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating your first lesson.</p>
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
                                   <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                     <svg className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                           lesson.isPublished 
                                             ? 'bg-green-100 text-green-800' 
                                             : 'bg-yellow-100 text-yellow-800'
                                         }`}>
                                           {lesson.isPublished ? 'Published' : 'Draft'}
                                         </span>
                                         <span className="text-sm text-gray-500">
                                           {lesson.category} • {lesson.level}
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
                                                         <div className="flex items-center space-x-2">
                               <button
                                 onClick={() => handleEditLesson(lesson)}
                                 className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                               >
                                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                 </svg>
                                 Edit
                               </button>
                               {lesson.isPublished ? (
                                 <button
                                   onClick={() => handleUnpublishLesson(lesson.id)}
                                   className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                 >
                                   <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                   </svg>
                                   Unpublish
                                 </button>
                               ) : (
                                 <button
                                   onClick={() => handlePublishLesson(lesson.id)}
                                   className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                 >
                                   <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                   </svg>
                                   Publish
                                 </button>
                               )}
                               <button
                                 onClick={() => handleDeleteLesson(lesson.id)}
                                 className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                               >
                                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                 </svg>
                                 Delete
                               </button>
                             </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard; 