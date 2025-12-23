import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useCareerContext } from '../context/CareerContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

// Form sections
import SkillsSection from '../components/assessment/SkillsSection';
import InterestsSection from '../components/assessment/InterestsSection';
import EducationSection from '../components/assessment/EducationSection';
import PreferencesSection from '../components/assessment/PreferencesSection';

const AssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { saveAssessment } = useCareerContext();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    skills: [],
    interests: [],
    education: {
      level: '',
      field: '',
      gpa: '',
    },
    preferences: {
      workEnvironment: [],
      workStyle: [],
      salary: '',
      location: '',
    }
  });

  const totalSteps = 4;
  
  const handleStepChange = (step: number) => {
    if (step <= totalSteps && step > 0) {
      setCurrentStep(step);
    }
  };

  const updateFormData = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.skills.length === 0) {
      toast.error('Please select at least one skill');
      setCurrentStep(1);
      return;
    }

    if (formData.interests.length === 0) {
      toast.error('Please select at least one interest');
      setCurrentStep(2);
      return;
    }

    if (!formData.education.level) {
      toast.error('Please select your education level');
      setCurrentStep(3);
      return;
    }

    if (!user) {
      toast.error('You must be logged in to save your assessment');
      return;
    }

    try {
      await saveAssessment(formData);
      toast.success('Assessment completed successfully!');
      navigate('/recommendations');
    } catch (error) {
      toast.error('Failed to save assessment. Please try again.');
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Career Assessment</h1>
        <p className="mt-2 text-gray-600">
          Complete this assessment to get personalized career recommendations
        </p>
      </div>
      
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <button
              key={step}
              onClick={() => handleStepChange(step)}
              className={`flex flex-col items-center ${
                step < currentStep 
                  ? 'text-blue-600' 
                  : step === currentStep 
                    ? 'text-blue-600' 
                    : 'text-gray-400'
              }`}
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 mb-2 ${
                step < currentStep 
                  ? 'border-blue-600 bg-blue-600 text-white' 
                  : step === currentStep 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-gray-300'
              }`}>
                {step < currentStep ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span>{step}</span>
                )}
              </div>
              <span className="text-sm hidden sm:block">
                {step === 1 && 'Skills'}
                {step === 2 && 'Interests'}
                {step === 3 && 'Education'}
                {step === 4 && 'Preferences'}
              </span>
            </button>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-1/4 ${step < totalSteps ? 'pr-8' : ''}`}
              >
                <div
                  className={`h-2 rounded-full transition-colors duration-200 ${
                    step <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
        {currentStep === 1 && (
          <SkillsSection 
            skills={formData.skills} 
            updateSkills={(skills) => updateFormData('skills', skills)} 
          />
        )}
        
        {currentStep === 2 && (
          <InterestsSection 
            interests={formData.interests} 
            updateInterests={(interests) => updateFormData('interests', interests)} 
          />
        )}
        
        {currentStep === 3 && (
          <EducationSection 
            education={formData.education} 
            updateEducation={(education) => updateFormData('education', education)} 
          />
        )}
        
        {currentStep === 4 && (
          <PreferencesSection 
            preferences={formData.preferences} 
            updatePreferences={(preferences) => updateFormData('preferences', preferences)} 
          />
        )}
        
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={() => handleStepChange(currentStep - 1)}
            className={`px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 ${
              currentStep === 1 ? 'invisible' : ''
            }`}
          >
            Previous
          </button>
          
          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={() => handleStepChange(currentStep + 1)}
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              Get Recommendations
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AssessmentPage;