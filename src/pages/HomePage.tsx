import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Book, FileText, Briefcase, MessageSquare } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Discover Your Perfect Career Path with AI
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Get personalized career recommendations, course suggestions, and expert advice powered by artificial intelligence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/assessment" 
                className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/resume" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg border border-blue-400 transition-colors duration-200"
              >
                Analyze Resume
                <FileText className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How CareerGPT Helps You</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive career guidance tailored to your unique skills and interests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Briefcase className="h-10 w-10 text-blue-600" />}
              title="Career Recommendations"
              description="Get AI-powered career suggestions based on your skills, interests, and education."
              link="/assessment"
              linkText="Take Assessment"
            />
            <FeatureCard 
              icon={<Book className="h-10 w-10 text-blue-600" />}
              title="Course Suggestions"
              description="Discover relevant online courses from top platforms to enhance your skills."
              link="/courses"
              linkText="Explore Courses"
            />
            <FeatureCard 
              icon={<FileText className="h-10 w-10 text-blue-600" />}
              title="Resume Analysis"
              description="Get your resume reviewed and rated with actionable improvement suggestions."
              link="/resume"
              linkText="Upload Resume"
            />
            <FeatureCard
              icon={<MessageSquare className="h-10 w-10 text-blue-600" />}
              title="AI Career Assistant"
              description="Chat with our AI assistant for personalized career advice and guidance."
              link="/chat"
              linkText="Ask Questions"
            />
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              See how CareerGPT has helped people find their dream careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="CareerGPT helped me discover a career path I never would have considered on my own. Now I'm thriving in my new role!"
              name="Sarah Johnson"
              title="Software Developer"
              image="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <TestimonialCard 
              quote="The course recommendations were spot on. I took three courses suggested by CareerGPT and landed my dream job within months."
              name="Michael Chen"
              title="Data Analyst"
              image="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <TestimonialCard 
              quote="The resume analysis feature highlighted issues I never would have caught. After making the suggested changes, I started getting interviews!"
              name="Jessica Miller"
              title="Marketing Specialist"
              image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Career?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-blue-100">
            Take our comprehensive assessment and get personalized career recommendations in minutes.
          </p>
          <Link 
            to="/assessment" 
            className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg text-lg transition-colors duration-200"
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, link, linkText, onClick }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link 
        to={link} 
        className="text-blue-600 font-medium inline-flex items-center hover:text-blue-800"
        onClick={onClick}
      >
        {linkText}
        <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
};

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, title, image }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
      <p className="text-gray-700 italic mb-6">"{quote}"</p>
      <div className="flex items-center">
        <img 
          src={image} 
          alt={name} 
          className="h-12 w-12 rounded-full object-cover mr-4" 
        />
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-gray-600 text-sm">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;