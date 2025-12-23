import React from 'react';

interface SkillsSectionProps {
  skills: string[];
  updateSkills: (skills: string[]) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, updateSkills }) => {
  const skillCategories = [
    {
      name: 'Technical Skills',
      skills: [
        'Programming', 'Data Analysis', 'Web Development',
        'Graphic Design', 'Network Administration', 'Database Management',
        'Machine Learning', 'Cybersecurity', 'Cloud Computing',
        'Mobile Development', 'UI/UX Design', 'DevOps'
      ]
    },
    {
      name: 'Business Skills',
      skills: [
        'Project Management', 'Marketing', 'Sales',
        'Financial Analysis', 'Business Strategy', 'Negotiation',
        'Leadership', 'Public Speaking', 'Customer Service',
        'Market Research', 'Content Creation', 'SEO'
      ]
    },
    {
      name: 'Creative Skills',
      skills: [
        'Writing', 'Editing', 'Photography',
        'Video Production', 'Illustration', '3D Modeling',
        'Animation', 'Music Production', 'Content Creation',
        'Game Design', 'Creative Direction', 'Visual Storytelling'
      ]
    },
    {
      name: 'Soft Skills',
      skills: [
        'Communication', 'Teamwork', 'Problem Solving',
        'Critical Thinking', 'Time Management', 'Adaptability',
        'Emotional Intelligence', 'Conflict Resolution', 'Decision Making',
        'Creativity', 'Attention to Detail', 'Work Ethic'
      ]
    }
  ];

  const handleSkillToggle = (skill: string) => {
    if (skills.includes(skill)) {
      updateSkills(skills.filter(s => s !== skill));
    } else {
      updateSkills([...skills, skill]);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Your Skills</h2>
      <p className="text-gray-600 mb-6">
        Choose all the skills that you possess. Select at least 3 skills for better recommendations.
      </p>

      {skillCategories.map((category) => (
        <div key={category.name} className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">{category.name}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {category.skills.map((skill) => (
              <div key={skill} className="flex items-center">
                <input
                  id={`skill-${skill}`}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={skills.includes(skill)}
                  onChange={() => handleSkillToggle(skill)}
                />
                <label
                  htmlFor={`skill-${skill}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {skill}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      {skills.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Skills ({skills.length})</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;