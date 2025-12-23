import React, { useEffect, useState } from 'react';
import { Plus, MessageCircle, Trash2, ChevronLeft } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import ChatWindow from '../components/chat/ChatWindow';
import ChatInput from '../components/chat/ChatInput';
import { toast } from 'react-hot-toast';

const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const {
    currentConversation,
    conversations,
    loading,
    error,
    sending,
    createConversation,
    loadConversations,
    loadConversation,
    sendMessage,
    deleteConversation,
    clearError,
  } = useChat();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user, loadConversations]);

  const handleNewConversation = async () => {
    try {
      await createConversation();
      toast.success('New conversation started');
    } catch (err) {
      toast.error('Failed to create conversation');
    }
  };

  const handleSelectConversation = async (conversationId: string) => {
    await loadConversation(conversationId);
    setSidebarOpen(false);
  };

  const handleDeleteConversation = async (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (deletingId === conversationId) {
      await deleteConversation(conversationId);
      setDeletingId(null);
      toast.success('Conversation deleted');
    } else {
      setDeletingId(conversationId);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!currentConversation) {
      toast.error('Please select or create a conversation');
      return;
    }
    await sendMessage(content);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <MessageCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In Required</h2>
          <p className="text-gray-600">Please log in to access the AI Career Assistant</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-gray-900 text-white transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="p-4 border-b border-gray-800">
          <button
            onClick={handleNewConversation}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {loading && conversations.length === 0 ? (
            <div className="text-gray-400 text-sm">Loading conversations...</div>
          ) : conversations.length === 0 ? (
            <div className="text-gray-400 text-sm">No conversations yet</div>
          ) : (
            conversations.map((convo) => (
              <div
                key={convo.id}
                onClick={() => handleSelectConversation(convo.id)}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  currentConversation?.id === convo.id
                    ? 'bg-blue-600'
                    : 'hover:bg-gray-800'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{convo.title}</p>
                  <p className="text-xs text-gray-400">
                    {convo.messages.length} messages
                  </p>
                </div>

                <button
                  onClick={(e) => handleDeleteConversation(convo.id, e)}
                  className={`flex-shrink-0 ml-2 p-1 rounded hover:bg-gray-700 transition-colors ${
                    deletingId === convo.id ? 'text-red-400' : 'text-gray-400'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-4 p-4 bg-white border-b border-gray-200">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            <ChevronLeft
              className={`w-6 h-6 transform transition-transform ${
                sidebarOpen ? '' : 'rotate-180'
              }`}
            />
          </button>

          <div className="flex-1">
            {currentConversation ? (
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {currentConversation.title}
                </h1>
                <p className="text-sm text-gray-500">
                  {currentConversation.messages.length} messages
                </p>
              </div>
            ) : (
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  AI Career Assistant
                </h1>
                <p className="text-sm text-gray-500">
                  Start a conversation to get career guidance
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col p-4 min-h-0">
          {currentConversation ? (
            <>
              <ChatWindow
                messages={currentConversation.messages}
                loading={sending}
                error={error}
                onClearError={clearError}
              />
              <ChatInput
                onSendMessage={handleSendMessage}
                disabled={!currentConversation || loading}
                placeholder="Ask me about your career..."
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <MessageCircle className="w-16 h-16 mb-4" />
              <p className="text-lg font-medium">No Conversation Selected</p>
              <p className="text-sm mt-2">
                Create a new chat or select one from the sidebar to begin
              </p>
              <button
                onClick={handleNewConversation}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start New Chat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
