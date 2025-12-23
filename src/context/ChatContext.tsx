import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { geminiService } from '../lib/gemini';
import { supabase } from '../lib/supabase';

export interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt?: Date;
}

export interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

interface ChatContextType {
  currentConversation: ChatConversation | null;
  conversations: ChatConversation[];
  loading: boolean;
  error: string | null;
  sending: boolean;

  createConversation: (title?: string) => Promise<void>;
  loadConversations: () => Promise<void>;
  loadConversation: (conversationId: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  deleteConversation: (conversationId: string) => Promise<void>;
  clearError: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [currentConversation, setCurrentConversation] = useState<ChatConversation | null>(null);
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const loadConversations = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error: err } = await supabase
        .from('chat_conversations')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (err) throw err;

      const convo = (data || []).map(item => ({
        id: item.id,
        title: item.title || 'Untitled Conversation',
        messages: [],
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at),
      }));

      setConversations(convo);
    } catch (err: any) {
      console.error('Error loading conversations:', err);
      setError('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  }, [user]);

  const loadConversation = useCallback(async (conversationId: string) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data: convoData, error: convoErr } = await supabase
        .from('chat_conversations')
        .select('*')
        .eq('id', conversationId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (convoErr) throw convoErr;
      if (!convoData) {
        setError('Conversation not found');
        return;
      }

      const { data: messagesData, error: messagesErr } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (messagesErr) throw messagesErr;

      const conversation: ChatConversation = {
        id: convoData.id,
        title: convoData.title || 'Untitled Conversation',
        messages: (messagesData || []).map(msg => ({
          id: msg.id,
          role: msg.role,
          content: msg.content,
          createdAt: new Date(msg.created_at),
        })),
        createdAt: new Date(convoData.created_at),
        updatedAt: new Date(convoData.updated_at),
      };

      setCurrentConversation(conversation);
    } catch (err: any) {
      console.error('Error loading conversation:', err);
      setError('Failed to load conversation');
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createConversation = useCallback(async (title?: string) => {
    if (!user) {
      setError('You must be logged in to start a conversation');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const convoTitle = title || 'New Career Conversation';

      const { data, error: err } = await supabase
        .from('chat_conversations')
        .insert({
          user_id: user.id,
          title: convoTitle,
        })
        .select()
        .single();

      if (err) throw err;

      const newConversation: ChatConversation = {
        id: data.id,
        title: data.title,
        messages: [],
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      };

      setCurrentConversation(newConversation);
      setConversations(prev => [newConversation, ...prev]);
    } catch (err: any) {
      console.error('Error creating conversation:', err);
      setError('Failed to create conversation');
    } finally {
      setLoading(false);
    }
  }, [user]);

  const sendMessage = useCallback(async (content: string) => {
    if (!user || !currentConversation) {
      setError('No active conversation');
      return;
    }

    if (!geminiService.isAvailable()) {
      setError('AI service is not available. Please check your Gemini API key.');
      return;
    }

    try {
      setSending(true);
      setError(null);

      const userMessage: ChatMessage = {
        role: 'user',
        content,
        createdAt: new Date(),
      };

      const { error: userMsgErr } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: currentConversation.id,
          user_id: user.id,
          role: 'user',
          content,
        });

      if (userMsgErr) throw userMsgErr;

      const conversationHistory = currentConversation.messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await geminiService.generateChatResponse(content, conversationHistory);

      if (response.error) {
        setError(response.text);
        setSending(false);
        return;
      }

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.text,
        createdAt: new Date(),
      };

      const { error: assistantMsgErr } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: currentConversation.id,
          user_id: user.id,
          role: 'assistant',
          content: response.text,
        });

      if (assistantMsgErr) throw assistantMsgErr;

      const updatedMessages = [...currentConversation.messages, userMessage, assistantMessage];
      const updatedConversation = {
        ...currentConversation,
        messages: updatedMessages,
        updatedAt: new Date(),
      };

      setCurrentConversation(updatedConversation);

      const { error: updateErr } = await supabase
        .from('chat_conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', currentConversation.id);

      if (updateErr) console.error('Error updating conversation timestamp:', updateErr);

      setConversations(prev =>
        prev.map(c =>
          c.id === currentConversation.id ? updatedConversation : c
        )
      );
    } catch (err: any) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  }, [user, currentConversation]);

  const deleteConversation = useCallback(async (conversationId: string) => {
    if (!user) return;

    try {
      const { error: err } = await supabase
        .from('chat_conversations')
        .delete()
        .eq('id', conversationId)
        .eq('user_id', user.id);

      if (err) throw err;

      setConversations(prev => prev.filter(c => c.id !== conversationId));

      if (currentConversation?.id === conversationId) {
        setCurrentConversation(null);
      }
    } catch (err: any) {
      console.error('Error deleting conversation:', err);
      setError('Failed to delete conversation');
    }
  }, [user, currentConversation]);

  return (
    <ChatContext.Provider
      value={{
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};