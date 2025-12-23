import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Book, Briefcase } from 'lucide-react';
import { useCareerContext } from '../context/CareerContext';
import CareerCard from '../components/recommendations/CareerCard';

const RecommendationsPage: React.FC = () => {
  const { assessmentData, recommendedCareers, loading: contextLoading } = useCareerContext();
  const [loading, setLoading] = useState(true);
  const [careers, setCareers] = useState<any[]>([]);

  useEffect(() => {
    setLoading(contextLoading);

    let filteredRecommendations = [...recommendedCareers];

    if (assessmentData?.interests.some(interest =>
      ['Computer Science', 'Artificial Intelligence', 'Robotics'].includes(interest)
    )) {
      filteredRecommendations = filteredRecommendations.sort((a, b) =>
        b.tags.includes('technology') ? 1 : a.tags.includes('technology') ? -1 : 0
      );
    }

    if (assessmentData?.skills.some(skill =>
      ['Graphic Design', 'UI/UX Design'].includes(skill)
    )) {
      filteredRecommendations = filteredRecommendations.filter(career =>
        career.tags.includes('design') || !career.tags.includes('design')
      );
    }

    setCareers(filteredRecommendations);
  }, [recommendedCareers, assessmentData, contextLoading]);

  // If user hasn't completed assessment, show a prompt
  if (!assessmentData && !loading) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <Briefcase className="mx-auto h-16 w-16 text-blue-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">No Assessment Data</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          To get personalized career recommendations, please complete the career assessment first.
        </p>
        <Link 
          to="/assessment" 
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Take Assessment
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Career Recommendations</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Based on your skills, interests, and preferences, here are careers that might be a great fit for you.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700 mb-4"></div>
          <p className="text-gray-600">Generating personalized recommendations...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careers.map((career) => (
              <CareerCard key={career.id} career={career} />
            ))}
          </div>

          <div className="mt-12 bg-blue-50 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Ready to build skills for these careers?</h2>
              <p className="text-gray-600">
                Explore recommended courses to help you prepare for your chosen career path.
              </p>
            </div>
            <Link 
              to="/courses" 
              className="mt-4 md:mt-0 inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              <Book className="mr-2 h-5 w-5" />
              Explore Courses
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default RecommendationsPage;