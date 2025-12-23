import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AssessmentPage from './pages/AssessmentPage';
import RecommendationsPage from './pages/RecommendationsPage';
import CoursesPage from './pages/CoursesPage';
import ResumePage from './pages/ResumePage';
import ChatPage from './pages/ChatPage';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import ResetPasswordForm from './components/auth/ResetPasswordForm';
import UserProfile from './components/auth/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';

import { CareerProvider } from './context/CareerContext';
import { ChatProvider } from './context/ChatContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CareerProvider>
        <ChatProvider>
          <div className="min-h-screen bg-gray-50">
            <Toaster position="top-right" />
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/forgot-password" element={<ForgotPasswordForm />} />
              <Route path="/reset-password" element={<ResetPasswordForm />} />

              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="assessment" element={<AssessmentPage />} />
                <Route path="recommendations" element={<RecommendationsPage />} />
                <Route path="courses" element={<CoursesPage />} />
                <Route path="resume" element={<ResumePage />} />
                <Route
                  path="chat"
                  element={
                    <ProtectedRoute>
                      <ChatPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="profile"
                  element={
                    <ProtectedRoute>
                      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                        <UserProfile />
                      </div>
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </div>
        </ChatProvider>
      </CareerProvider>
    </AuthProvider>
  );
}

export default App;