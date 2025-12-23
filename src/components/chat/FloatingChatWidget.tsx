import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { recommendationService } from '../../lib/recommendationService';
import toast from 'react-hot-toast';

interface QuickMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const FloatingChatWidget: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<QuickMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage: QuickMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await recommendationService.generateSmartResponse(
        userMessage.content,
        user?.id || null
      );

      const assistantMessage: QuickMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to get response');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenFullChat = () => {
    if (!user) {
      toast.error('Please log in to access the full chat');
      navigate('/login');
      return;
    }
    navigate('/chat');
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isOpen
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-600 hover:bg-blue-700 animate-pulse'
        } text-white`}
        aria-label="Toggle chat"
        title={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      <div
        className={`fixed bottom-24 right-6 z-40 w-96 bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300 transform origin-bottom-right ${
          isOpen
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-8 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Career Assistant</h3>
            <p className="text-xs text-blue-100">Quick answers powered by AI</p>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-blue-500 rounded transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="h-80 overflow-y-auto bg-gray-50 p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-600">
              <MessageCircle className="w-12 h-12 text-blue-300 mb-3" />
              <p className="text-sm font-medium">How can I help?</p>
              <p className="text-xs text-gray-500 mt-1">
                Ask about careers, interview tips, or resume advice
              </p>
              <div className="mt-4 space-y-2 w-full">
                <button
                  onClick={() => {
                    setInput('What careers match my skills?');
                  }}
                  className="w-full text-left text-xs p-2 bg-white border border-gray-200 rounded hover:bg-blue-50 text-gray-700 transition-colors"
                >
                  💼 What careers match my skills?
                </button>
                <button
                  onClick={() => {
                    setInput('How do I prepare for interviews?');
                  }}
                  className="w-full text-left text-xs p-2 bg-white border border-gray-200 rounded hover:bg-blue-50 text-gray-700 transition-colors"
                >
                  🎤 Interview preparation tips
                </button>
                <button
                  onClick={() => {
                    setInput('How can I improve my resume?');
                  }}
                  className="w-full text-left text-xs p-2 bg-white border border-gray-200 rounded hover:bg-blue-50 text-gray-700 transition-colors"
                >
                  📄 Resume improvement tips
                </button>
              </div>
            </div>
          ) : (
            <>
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white border border-gray-200 text-gray-900 rounded-bl-none'
                    }`}
                  >
                    <p className="break-words">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.role === 'user'
                          ? 'text-blue-100'
                          : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none px-3 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {user && messages.length > 0 && (
          <div className="bg-white border-t border-gray-200 p-2 flex gap-2">
            <button
              onClick={handleOpenFullChat}
              className="flex-1 text-xs py-2 px-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
            >
              <span>Full Chat</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}

        <form onSubmit={handleSendMessage} className="border-t border-gray-200 bg-white p-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a question..."
              disabled={isLoading}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
              aria-label="Send message"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send
          </p>
        </form>
      </div>
    </>
  );
};

export default FloatingChatWidget;
