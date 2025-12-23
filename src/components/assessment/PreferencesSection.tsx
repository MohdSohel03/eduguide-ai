import React from 'react';

interface Preferences {
  workEnvironment: string[];
  workStyle: string[];
  salary: string;
  location: string;
}

interface PreferencesSectionProps {
  preferences: Preferences;
  updatePreferences: (preferences: Preferences) => void;
}

const PreferencesSection: React.FC<PreferencesSectionProps> = ({ preferences, updatePreferences }) => {
  const workEnvironments = [
    'Office/Corporate', 'Remote', 'Hybrid',
    'Outdoor', 'Startup', 'Enterprise',
    'Non-profit', 'Government', 'Academic'
  ];

  const workStyles = [
    'Independent', 'Collaborative', 'Fast-paced',
    'Structured', 'Creative', 'Technical',
    'Customer-facing', 'Research-oriented', 'Project-based'
  ];

  const salaryRanges = [
    'Any',
    '$30,000 - $50,000',
    '$50,000 - $75,000',
    '$75,000 - $100,000',
    '$100,000 - $150,000',
    '$150,000+'
  ];

  const handleWorkEnvironmentToggle = (env: string) => {
    if (preferences.workEnvironment.includes(env)) {
      updatePreferences({
        ...preferences,
        workEnvironment: preferences.workEnvironment.filter(e => e !== env)
      });
    } else {
      updatePreferences({
        ...preferences,
        workEnvironment: [...preferences.workEnvironment, env]
      });
    }
  };

  const handleWorkStyleToggle = (style: string) => {
    if (preferences.workStyle.includes(style)) {
      updatePreferences({
        ...preferences,
        workStyle: preferences.workStyle.filter(s => s !== style)
      });
    } else {
      updatePreferences({
        ...preferences,
        workStyle: [...preferences.workStyle, style]
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    updatePreferences({
      ...preferences,
      [name]: value
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Work Preferences</h2>
      <p className="text-gray-600 mb-6">
        Tell us about your preferred work environment and conditions to help us refine recommendations.
      </p>

      <div className="space-y-8">
        <div>
          <h3 className="text-md font-medium text-gray-800 mb-3">Preferred Work Environment</h3>
          <p className="text-sm text-gray-600 mb-3">Select all that apply</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {workEnvironments.map((env) => (
              <div key={env} className="flex items-center">
                <input
                  id={`env-${env}`}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={preferences.workEnvironment.includes(env)}
                  onChange={() => handleWorkEnvironmentToggle(env)}
                />
                <label
                  htmlFor={`env-${env}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {env}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-md font-medium text-gray-800 mb-3">Preferred Work Style</h3>
          <p className="text-sm text-gray-600 mb-3">Select all that apply</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {workStyles.map((style) => (
              <div key={style} className="flex items-center">
                <input
                  id={`style-${style}`}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={preferences.workStyle.includes(style)}
                  onChange={() => handleWorkStyleToggle(style)}
                />
                <label
                  htmlFor={`style-${style}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {style}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-md font-medium text-gray-800 mb-3">Salary Expectations</h3>
          <select
            id="salary"
            name="salary"
            value={preferences.salary}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="" disabled>Select desired salary range</option>
            {salaryRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-md font-medium text-gray-800 mb-3">Preferred Location</h3>
          <input
            type="text"
            name="location"
            id="location"
            value={preferences.location}
            onChange={handleChange}
            placeholder="City, State, Country or 'Remote'"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {(preferences.workEnvironment.length > 0 || preferences.workStyle.length > 0 || preferences.salary || preferences.location) && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Preferences Summary</h3>
          <div className="text-sm">
            {preferences.workEnvironment.length > 0 && (
              <div className="mb-2">
                <p className="font-medium text-gray-700">Work Environment:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {preferences.workEnvironment.map(env => (
                    <span key={env} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {env}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {preferences.workStyle.length > 0 && (
              <div className="mb-2">
                <p className="font-medium text-gray-700">Work Style:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {preferences.workStyle.map(style => (
                    <span key={style} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {preferences.salary && (
              <p className="mb-1"><span className="font-medium text-gray-700">Salary Range:</span> {preferences.salary}</p>
            )}
            
            {preferences.location && (
              <p><span className="font-medium text-gray-700">Location:</span> {preferences.location}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreferencesSection;