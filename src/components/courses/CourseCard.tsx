import React from 'react';
import { Clock, Star, Bookmark, ExternalLink, Award } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  platform: string;
  instructor: string;
  price: string;
  duration: string;
  level: string;
  rating: number;
  ratingCount: number;
  skills: string[];
  imageUrl: string;
  url: string;
  careers: string[];
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col h-full">
      <div className="relative h-48">
        <img 
          src={course.imageUrl} 
          alt={course.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 m-2 bg-white px-2 py-1 rounded text-xs font-medium">
          {course.platform}
        </div>
        {course.price === 'Free' && (
          <div className="absolute top-0 right-0 m-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
            Free
          </div>
        )}
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{course.title}</h3>
          <button className="text-gray-400 hover:text-blue-600" aria-label="Bookmark course">
            <Bookmark className="h-5 w-5" />
          </button>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>
        
        <div className="mb-3 mt-auto">
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <Award className="h-4 w-4 mr-1" />
            <span>By {course.instructor}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>{course.duration}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span>{course.rating} ({course.ratingCount})</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">
              {course.price === 'Free' ? (
                <span className="text-green-600">Free</span>
              ) : (
                <span className="text-gray-900">{course.price}</span>
              )}
            </div>
            
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {course.level}
              </span>
            </div>
          </div>
        </div>
        
        <div className="pt-3 border-t border-gray-100">
          <a 
            href={course.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Course
            <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;