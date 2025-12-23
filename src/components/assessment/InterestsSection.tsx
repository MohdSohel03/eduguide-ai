import React from 'react';

interface InterestsSectionProps {
  interests: string[];
  updateInterests: (interests: string[]) => void;
}

const InterestsSection: React.FC<InterestsSectionProps> = ({ interests, updateInterests }) => {
  const interestCategories = [
    {
      name: 'Science & Technology',
      interests: [
        'Computer Science', 'Robotics', 'Artificial Intelligence',
        'Space Exploration', 'Biotechnology', 'Environmental Science',
        'Quantum Computing', 'Neuroscience', 'Medicine',
        'Renewable Energy', 'Genetics', 'Physics'
      ]
    },
    {
      name: 'Arts & Humanities',
      interests: [
        'Literature', 'History', 'Philosophy',
        'Visual Arts', 'Music', 'Performing Arts',
        'Film & Media', 'Languages', 'Archaeology',
        'Anthropology', 'Cultural Studies', 'Creative Writing'
      ]
    },
    {
      name: 'Business & Economics',
      interests: [
        'Entrepreneurship', 'Finance', 'Marketing',
        'Management', 'Economics', 'International Business',
        'E-commerce', 'Real Estate', 'Investing',
        'Business Analytics', 'Consulting', 'Supply Chain'
      ]
    },
    {
      name: 'Social Impact & Service',
      interests: [
        'Education', 'Healthcare', 'Social Justice',
        'Non-profit Management', 'Public Policy', 'Sustainability',
        'Community Development', 'Human Rights', 'International Relations',
        'Humanitarian Aid', 'Mental Health', 'Environmental Advocacy'
      ]
    }
  ];

  const handleInterestToggle = (interest: string) => {
    if (interests.includes(interest)) {
      updateInterests(interests.filter(i => i !== interest));
    } else {
      updateInterests([...interests, interest]);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Your Interests</h2>
      <p className="text-gray-600 mb-6">
        Choose topics that you're passionate about. Select at least 3 interests for better recommendations.
      </p>

      {interestCategories.map((category) => (
        <div key={category.name} className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">{category.name}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {category.interests.map((interest) => (
              <div key={interest} className="flex items-center">
                <input
                  id={`interest-${interest}`}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={interests.includes(interest)}
                  onChange={() => handleInterestToggle(interest)}
                />
                <label
                  htmlFor={`interest-${interest}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {interest}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      {interests.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Interests ({interests.length})</h3>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <span
                key={interest}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InterestsSection;