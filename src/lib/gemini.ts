import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('Gemini API key not found. AI features will be disabled.');
}

let genAI: GoogleGenerativeAI | null = null;

if (API_KEY && API_KEY !== 'YOUR_GEMINI_API_KEY') {
  genAI = new GoogleGenerativeAI(API_KEY);
}

export interface GeminiResponse {
  text: string;
  error?: string;
}

export interface CareerAdviceRequest {
  userProfile?: {
    skills: string[];
    interests: string[];
    experience: string;
    education: string;
  };
  question: string;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

const CAREER_SYSTEM_PROMPT = `You are CareerGPT, an expert AI career counselor and advisor. You specialize in:
- Career guidance and planning
- Resume review and optimization
- Interview preparation
- Job search strategies
- Skill development recommendations
- Industry insights and job market trends
- Salary negotiation advice
- Work-life balance and career transitions
- Professional networking
- Personal branding

Your tone is professional, encouraging, and practical. Provide specific, actionable advice tailored to the user's situation. When discussing career paths, consider the user's background, skills, and interests. Ask clarifying questions when needed. Maintain context across the conversation for personalized recommendations.`;

export const geminiService = {
  isAvailable: () => genAI !== null,

  generateCareerAdvice: async (request: CareerAdviceRequest): Promise<GeminiResponse> => {
    if (!genAI) {
      return {
        text: "I'm sorry, but the AI service is currently unavailable. Please check your API configuration.",
        error: 'API_KEY_MISSING'
      };
    }

    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-pro',
        systemInstruction: CAREER_SYSTEM_PROMPT
      });

      let prompt = request.question;

      if (request.userProfile) {
        prompt = `User Profile:
- Skills: ${request.userProfile.skills.join(', ') || 'Not specified'}
- Interests: ${request.userProfile.interests.join(', ') || 'Not specified'}
- Experience: ${request.userProfile.experience || 'Not specified'}
- Education: ${request.userProfile.education || 'Not specified'}

Question: ${request.question}`;
      }

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return { text };
    } catch (error: any) {
      console.error('Gemini API Error:', error);

      if (error.message?.includes('API_KEY')) {
        return {
          text: "There's an issue with the AI service configuration. Please try again later.",
          error: 'API_KEY_INVALID'
        };
      }

      if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
        return {
          text: "The AI service is currently experiencing high demand. Please try again in a few moments.",
          error: 'RATE_LIMITED'
        };
      }

      return {
        text: "I'm experiencing technical difficulties. Please try rephrasing your question or try again later.",
        error: 'UNKNOWN_ERROR'
      };
    }
  },

  generateChatResponse: async (
    message: string,
    conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>
  ): Promise<GeminiResponse> => {
    if (!genAI) {
      return {
        text: "I'm sorry, but the AI service is currently unavailable. Please check your API configuration.",
        error: 'API_KEY_MISSING'
      };
    }

    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-pro',
        systemInstruction: CAREER_SYSTEM_PROMPT
      });

      const messages = conversationHistory.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        parts: [{ text: msg.content }]
      }));

      const chat = model.startChat({ history: messages });
      const result = await chat.sendMessage(message);
      const response = await result.response;
      const text = response.text();

      return { text };
    } catch (error: any) {
      console.error('Gemini Chat Error:', error);

      if (error.message?.includes('API_KEY')) {
        return {
          text: "There's an issue with the AI service configuration. Please try again later.",
          error: 'API_KEY_INVALID'
        };
      }

      if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
        return {
          text: "The AI service is currently experiencing high demand. Please try again in a few moments.",
          error: 'RATE_LIMITED'
        };
      }

      return {
        text: "I'm experiencing technical difficulties. Please try again later.",
        error: 'UNKNOWN_ERROR'
      };
    }
  },

  generateResumeAnalysis: async (resumeContent: string): Promise<GeminiResponse> => {
    if (!genAI) {
      return {
        text: "AI resume analysis is currently unavailable.",
        error: 'API_KEY_MISSING'
      };
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `You are an expert resume reviewer. Analyze this resume content and provide:

1. Overall score (1-100)
2. Top 3 strengths
3. Top 3 areas for improvement
4. Specific actionable recommendations

Resume Content:
${resumeContent}

Please format your response clearly with sections for each point.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return { text };
    } catch (error: any) {
      console.error('Gemini Resume Analysis Error:', error);
      return {
        text: "Unable to analyze resume at this time. Please try again later.",
        error: 'ANALYSIS_FAILED'
      };
    }
  }
};