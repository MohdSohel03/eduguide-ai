import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { databaseService } from '../lib/database';

interface AssessmentData {
  skills: string[];
  interests: string[];
  education: {
    level: string;
    field: string;
    gpa: string;
  };
  preferences: {
    workEnvironment: string[];
    workStyle: string[];
    salary: string;
    location: string;
  };
}

interface CareerContextType {
  assessmentData: AssessmentData | null;
  recommendedCareers: any[];
  courses: any[];
  loading: boolean;
  setAssessmentData: (data: AssessmentData) => void;
  setRecommendedCareers: (careers: any[]) => void;
  saveAssessment: (data: AssessmentData) => Promise<void>;
  loadCareers: () => Promise<void>;
  loadCourses: () => Promise<void>;
  loadAssessment: () => Promise<void>;
}

const CareerContext = createContext<CareerContextType | undefined>(undefined);

export const CareerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [recommendedCareers, setRecommendedCareers] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCareers = async () => {
    try {
      const { data, error } = await databaseService.careers.getCareerRecommendations();
      if (error) throw error;
      setRecommendedCareers(data || []);
    } catch (error) {
      console.error('Error loading careers:', error);
    }
  };

  const loadCourses = async () => {
    try {
      const { data, error } = await databaseService.courses.getCourses();
      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  const loadAssessment = async () => {
    if (!user) return;
    try {
      const { data, error } = await databaseService.assessments.getAssessment(user.id);
      if (error) throw error;
      if (data) {
        setAssessmentData({
          skills: data.skills || [],
          interests: data.interests || [],
          education: {
            level: data.education_level || '',
            field: data.education_field || '',
            gpa: data.education_gpa || '',
          },
          preferences: {
            workEnvironment: data.work_environment || [],
            workStyle: data.work_style || [],
            salary: data.salary_preference || '',
            location: data.location_preference || '',
          },
        });
      }
    } catch (error) {
      console.error('Error loading assessment:', error);
    }
  };

  const saveAssessment = async (data: AssessmentData) => {
    if (!user) return;
    try {
      const { error } = await databaseService.assessments.saveAssessment(user.id, data);
      if (error) throw error;
      setAssessmentData(data);
    } catch (error) {
      console.error('Error saving assessment:', error);
      throw error;
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await loadCareers();
      await loadCourses();
      if (user) {
        await loadAssessment();
      }
      setLoading(false);
    };

    initializeData();
  }, [user]);

  return (
    <CareerContext.Provider value={{
      assessmentData,
      recommendedCareers,
      courses,
      loading,
      setAssessmentData,
      setRecommendedCareers,
      saveAssessment,
      loadCareers,
      loadCourses,
      loadAssessment,
    }}>
      {children}
    </CareerContext.Provider>
  );
};

export const useCareerContext = (): CareerContextType => {
  const context = useContext(CareerContext);
  if (context === undefined) {
    throw new Error('useCareerContext must be used within a CareerProvider');
  }
  return context;
};