import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useCareerContext } from '../context/CareerContext';
import CourseCard from '../components/courses/CourseCard';

const CoursesPage: React.FC = () => {
  const { recommendedCareers, courses, loading: contextLoading } = useCareerContext();
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [selectedCareer, setSelectedCareer] = useState('all');

  useEffect(() => {
    setLoading(contextLoading);
    setFilteredCourses(courses);
  }, [courses, contextLoading]);

  // Apply filters
  useEffect(() => {
    let filtered = [...courses];
    
    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.skills.some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply price filter
    if (priceFilter !== 'all') {
      if (priceFilter === 'free') {
        filtered = filtered.filter(course => course.price === 'Free');
      } else if (priceFilter === 'paid') {
        filtered = filtered.filter(course => course.price !== 'Free');
      }
    }
    
    // Apply platform filter
    if (platformFilter !== 'all') {
      filtered = filtered.filter(course => course.platform === platformFilter);
    }
    
    // Apply career filter
    if (selectedCareer !== 'all') {
      filtered = filtered.filter(course => 
        course.careers.includes(selectedCareer)
      );
    }
    
    setFilteredCourses(filtered);
  }, [courses, searchTerm, priceFilter, platformFilter, selectedCareer]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Recommended Courses</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Enhance your skills with these courses from top online learning platforms.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search courses by title, description or skills"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-4">
            <select
              className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
            
            <select
              className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
            >
              <option value="all">All Platforms</option>
              <option value="Coursera">Coursera</option>
              <option value="edX">edX</option>
              <option value="Udemy">Udemy</option>
              <option value="LinkedIn Learning">LinkedIn Learning</option>
            </select>
            
            <select
              className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={selectedCareer}
              onChange={(e) => setSelectedCareer(e.target.value)}
            >
              <option value="all">All Career Paths</option>
              {recommendedCareers.map(career => (
                <option key={career.id} value={career.title}>
                  {career.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700 mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      ) : (
        <>
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No courses match your filters. Try adjusting your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CoursesPage;