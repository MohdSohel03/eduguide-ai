import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex gap-3 mb-4">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
        </div>
      </div>

      <div className="max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg bg-gray-100 rounded-bl-none">
        <div className="flex gap-1 h-4">
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
