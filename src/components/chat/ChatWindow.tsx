import React, { useEffect, useRef } from 'react';
import { AlertCircle } from 'lucide-react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import { ChatMessage as Message } from '../../context/ChatContext';

interface ChatWindowProps {
  messages: Message[];
  loading?: boolean;
  error?: string | null;
  onClearError?: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  loading = false,
  error = null,
  onClearError
}) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="text-4xl mb-4">💬</div>
            <p className="text-lg font-medium">Start a Conversation</p>
            <p className="text-sm mt-2 text-center">
              Ask me about career guidance, interview prep, resume tips, and more!
            </p>
          </div>
        )}

        {messages.map((message) => (
          <ChatMessage key={message.id || `${message.createdAt}-${message.role}`} message={message} />
        ))}

        {loading && <TypingIndicator />}

        {error && (
          <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-800">{error}</p>
              {onClearError && (
                <button
                  onClick={onClearError}
                  className="text-xs text-red-600 hover:text-red-700 mt-1 underline"
                >
                  Dismiss
                </button>
              )}
            </div>
          </div>
        )}

        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
