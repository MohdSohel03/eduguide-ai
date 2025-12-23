import React from 'react';

interface Education {
  level: string;
  field: string;
  gpa: string;
}

interface EducationSectionProps {
  education: Education;
  updateEducation: (education: Education) => void;
}

const EducationSection: React.FC<EducationSectionProps> = ({ education, updateEducation }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    updateEducation({
      ...education,
      [name]: value
    });
  };

  const educationLevels = [
    'High School',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Doctorate',
    'Professional Certification',
    'Self-taught',
    'Other'
  ];

  const educationFields = [
    'Computer Science',
    'Business Administration',
    'Engineering',
    'Liberal Arts',
    'Fine Arts',
    'Education',
    'Healthcare',
    'Social Sciences',
    'Natural Sciences',
    'Mathematics',
    'Law',
    'Medicine',
    'Other'
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Education Information</h2>
      <p className="text-gray-600 mb-6">
        Tell us about your educational background to help us recommend suitable career paths.
      </p>

      <div className="space-y-6">
        <div>
          <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
            Highest Education Level
          </label>
          <select
            id="level"
            name="level"
            value={education.level}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            required
          >
            <option value="" disabled>Select your education level</option>
            {educationLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-1">
            Field of Study
          </label>
          <select
            id="field"
            name="field"
            value={education.field}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="" disabled>Select your field of study</option>
            {educationFields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">Optional, but helps with better recommendations</p>
        </div>

        <div>
          <label htmlFor="gpa" className="block text-sm font-medium text-gray-700 mb-1">
            GPA (if applicable)
          </label>
          <input
            type="text"
            name="gpa"
            id="gpa"
            value={education.gpa}
            onChange={handleChange}
            placeholder="Example: 3.5"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <p className="mt-1 text-xs text-gray-500">Optional, on a scale of 0-4.0</p>
        </div>
      </div>

      {education.level && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Education Summary</h3>
          <div className="text-sm text-gray-600">
            <p><span className="font-medium">Level:</span> {education.level}</p>
            {education.field && <p><span className="font-medium">Field:</span> {education.field}</p>}
            {education.gpa && <p><span className="font-medium">GPA:</span> {education.gpa}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationSection;