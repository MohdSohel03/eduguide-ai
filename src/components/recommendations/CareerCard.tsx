import React, { useState } from 'react';
import { Briefcase, TrendingUp, DollarSign, ChevronDown, ChevronUp, Star, Award } from 'lucide-react';

interface Career {
  id: number;
  title: string;
  description: string;
  averageSalary: string;
  growth: string;
  education: string;
  skills: string[];
  matchScore: number;
  tasks: string[];
  tags: string[];
}

interface CareerCardProps {
  career: Career;
}

const CareerCard: React.FC<CareerCardProps> = ({ career }) => {
  const [expanded, setExpanded] = useState(false);

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 75) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{career.title}</h3>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getMatchScoreColor(career.matchScore)}`}>
            {career.matchScore}% Match
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">{career.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 text-blue-500 mr-1" />
            <span className="text-sm text-gray-700">{career.averageSalary}</span>
          </div>
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-gray-700">{career.growth} Growth</span>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Required Skills</h4>
          <div className="flex flex-wrap gap-1">
            {career.skills.slice(0, expanded ? career.skills.length : 4).map((skill) => (
              <span key={skill} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                {skill}
              </span>
            ))}
            {!expanded && career.skills.length > 4 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-50 text-gray-500">
                +{career.skills.length - 4} more
              </span>
            )}
          </div>
        </div>
        
        {expanded && (
          <>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Typical Tasks</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {career.tasks.map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Education Required</h4>
              <div className="flex items-center">
                <Award className="h-4 w-4 text-purple-500 mr-1" />
                <span className="text-sm text-gray-600">{career.education}</span>
              </div>
            </div>
          </>
        )}
        
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          {expanded ? (
            <>
              Show Less
              <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Show More
              <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CareerCard;