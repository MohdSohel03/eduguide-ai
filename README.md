# CareerGPT - AI-Powered Career Counselor

A comprehensive career development platform that combines AI-powered recommendations with user authentication and personalized guidance.

## Features

### 🔐 Authentication System
- **User Registration & Login** with Supabase Auth
- **Email/Password Authentication** with validation
- **Password Reset** functionality via email
- **Session Management** with persistent user state
- **Protected Routes** for authenticated content

### 🤖 AI Integration
- **Google Gemini AI** integration for personalized career advice
- **Context-Aware Chatbot** that uses user profile data
- **AI-Powered Resume Analysis** with actionable feedback
- **Intelligent Career Recommendations** based on user assessment

### 💼 Career Development Tools
- **Comprehensive Skills Assessment** with multiple categories
- **Interest-Based Career Matching** using AI algorithms
- **Course Recommendations** from top learning platforms
- **Resume Upload & Analysis** with AI feedback
- **Interactive Career Cards** with detailed information

### 🎨 User Experience
- **Responsive Design** for all device sizes
- **Modern UI/UX** with Tailwind CSS
- **Real-time Notifications** with React Hot Toast
- **Loading States** and error handling
- **Smooth Animations** and transitions

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Authentication**: Supabase Auth
- **AI Integration**: Google Gemini AI API
- **Routing**: React Router v6
- **State Management**: React Context API
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Build Tool**: Vite

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Gemini AI Configuration
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Update the environment variables with your Supabase credentials
4. Authentication is automatically configured - no additional setup needed

### 3. Google Gemini AI Setup

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key for Gemini
3. Replace `YOUR_GEMINI_API_KEY` in `.env.local` with your actual API key

### 4. Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── auth/                 # Authentication components
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── ForgotPasswordForm.tsx
│   │   ├── ResetPasswordForm.tsx
│   │   └── UserProfile.tsx
│   ├── assessment/           # Career assessment components
│   ├── chat/                 # AI chatbot components
│   ├── courses/              # Course recommendation components
│   ├── recommendations/      # Career recommendation components
│   └── ProtectedRoute.tsx    # Route protection
├── context/
│   ├── AuthContext.tsx       # Authentication state management
│   ├── CareerContext.tsx     # Career data management
│   └── ChatContext.tsx       # Chat functionality
├── lib/
│   ├── supabase.ts          # Supabase client configuration
│   └── gemini.ts            # Gemini AI integration
├── pages/                   # Main application pages
└── data/
    └── mockData.ts          # Sample data for development
```

## Key Features Explained

### Authentication Flow
1. Users can register with email/password
2. Email verification is handled by Supabase
3. Password reset sends secure reset links
4. Session persistence across browser refreshes
5. Protected routes redirect to login when needed

### AI Integration
- **Gemini AI** provides contextual career advice
- **User Profile Integration** for personalized responses
- **Conversation History** maintained for context
- **Fallback Responses** when AI is unavailable
- **Error Handling** for API failures and rate limits

### Career Assessment
- **Multi-step Form** with progress tracking
- **Skills Categories**: Technical, Business, Creative, Soft Skills
- **Interest Areas**: Science & Tech, Arts & Humanities, Business, Social Impact
- **Education & Preferences** for comprehensive profiling

### Resume Analysis
- **File Upload** support for PDF and DOCX
- **AI-Powered Analysis** using Gemini AI
- **Structured Feedback** with scores and recommendations
- **Fallback Analysis** when AI is unavailable

## Security Features

- **Input Validation** on all forms
- **Password Strength** indicators and requirements
- **Rate Limiting** considerations for AI API calls
- **Secure File Upload** with type and size validation
- **Environment Variable** protection for API keys

## Error Handling

- **Network Errors** with user-friendly messages
- **API Failures** with graceful degradation
- **Form Validation** with real-time feedback
- **Loading States** for better UX
- **Toast Notifications** for user feedback

## Deployment Notes

1. **Environment Variables**: Ensure all required env vars are set in production
2. **Supabase**: Configure your production Supabase instance
3. **Gemini API**: Set up billing and quotas for production use
4. **CORS**: Configure allowed origins in Supabase dashboard
5. **Email Templates**: Customize auth email templates in Supabase

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.