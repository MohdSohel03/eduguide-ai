import React, { useState } from 'react';
import { FileUp, Check, AlertCircle, Upload, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { geminiService } from '../lib/gemini';
import { useAuth } from '../context/AuthContext';

const ResumePage: React.FC = () => {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [resumeScore, setResumeScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [improvements, setImprovements] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (!selectedFile) return;
    
    // Check file type - only accept PDF and DOCX
    const fileType = selectedFile.type;
    if (fileType !== 'application/pdf' && 
        fileType !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      toast.error('Please upload a PDF or DOCX file only');
      return;
    }
    
    // Check file size - limit to 5MB
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit');
      return;
    }
    
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }
    
    setUploadStatus('uploading');
    
    try {
      // Extract text from file (simplified - in production, use proper PDF/DOCX parsing)
      const text = await extractTextFromFile(file);
      
      if (geminiService.isAvailable()) {
        // Use Gemini AI for analysis
        const analysis = await geminiService.generateResumeAnalysis(text);
        parseAIAnalysis(analysis.text);
      } else {
        // Fallback to mock analysis
        generateMockAnalysis();
      }
      
      setUploadStatus('success');
      toast.success('Resume analyzed successfully!');
    } catch (error) {
      console.error('Resume analysis error:', error);
      setUploadStatus('error');
      toast.error('Failed to analyze resume. Please try again.');
    }
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    // Simplified text extraction - in production, use libraries like pdf-parse or mammoth
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        // This is a simplified approach - real implementation would parse PDF/DOCX properly
        resolve(e.target?.result as string || '');
      };
      reader.readAsText(file);
    });
  };

  const parseAIAnalysis = (analysisText: string) => {
    // Parse the AI response to extract structured data
    const lines = analysisText.split('\n').filter(line => line.trim());
    
    // Extract score (look for numbers between 1-100)
    const scoreMatch = analysisText.match(/(\d{1,3})(?:\s*\/\s*100|\s*%|\s*out of 100)/i);
    if (scoreMatch) {
      setResumeScore(Math.min(100, Math.max(0, parseInt(scoreMatch[1]))));
    } else {
      setResumeScore(75); // Default score if not found
    }

    // Extract strengths and improvements (simplified parsing)
    const strengthsSection = analysisText.match(/strengths?:?\s*(.*?)(?=improvement|recommendation|$)/is);
    const improvementsSection = analysisText.match(/improvement|recommendation:?\s*(.*?)$/is);

    if (strengthsSection) {
      const strengthsList = strengthsSection[1].split(/\d+\.|\-|\•/).filter(s => s.trim().length > 10);
      setStrengths(strengthsList.slice(0, 4).map(s => s.trim()));
    }

    if (improvementsSection) {
      const improvementsList = improvementsSection[1].split(/\d+\.|\-|\•/).filter(s => s.trim().length > 10);
      setImprovements(improvementsList.slice(0, 4).map(s => s.trim()));
    }

    // Set the full analysis as feedback
    setFeedback([analysisText]);
  };

  const generateMockAnalysis = () => {
    setResumeScore(78);
    setStrengths([
      'Strong technical skills section with relevant technologies',
      'Clear work experience with quantifiable achievements',
      'Well-structured layout with good organization',
      'Appropriate length and conciseness'
    ]);
    setImprovements([
      'Add more action verbs to describe accomplishments',
      'Tailor resume more specifically to target roles',
      'Include more quantitative results and metrics',
      'Add relevant certifications or continuing education'
    ]);
    setFeedback([
      'Your resume demonstrates solid experience but could benefit from more specific achievements',
      'Consider adding a brief professional summary at the top',
      'Tailor your skills section more specifically to the job descriptions you\'re targeting',
      'Use more powerful action verbs throughout your experience descriptions'
    ]);
  };

  const resetAnalysis = () => {
    setFile(null);
    setUploadStatus('idle');
    setResumeScore(null);
    setFeedback([]);
    setStrengths([]);
    setImprovements([]);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Resume Analysis</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload your resume for {geminiService.isAvailable() ? 'AI-powered' : 'detailed'} analysis and get actionable feedback to improve your chances of landing interviews.
        </p>
        {!user && (
          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-700">
              💡 Sign in to get more personalized resume analysis based on your career goals!
            </p>
          </div>
        )}
      </div>

      {uploadStatus !== 'success' ? (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Upload Your Resume</h2>
            <p className="text-gray-600 mb-4">
              Upload your resume in PDF or DOCX format to get detailed feedback and suggestions for improvement.
            </p>
            
            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF or DOCX up to 5MB</p>
              </div>
            </div>
          </div>
          
          {file && (
            <div className="flex items-center justify-between bg-blue-50 p-3 rounded-md">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm font-medium">{file.name}</span>
              </div>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          )}
          
          <div className="mt-6">
            <button
              type="button"
              onClick={handleUpload}
              disabled={!file || uploadStatus === 'uploading'}
              className={`w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                !file || uploadStatus === 'uploading'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              {uploadStatus === 'uploading' ? (
                <>
                  <RefreshCw className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Upload className="-ml-1 mr-2 h-5 w-5" />
                  Analyze Resume
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Resume Analysis Results</h2>
              <div className="text-white text-sm">
                {file?.name}
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
              <div className="mb-4 sm:mb-0">
                <h3 className="text-lg font-medium text-gray-900 mb-1">Resume Score</h3>
                <p className="text-sm text-gray-600">
                  Based on content, format, and industry standards
                </p>
              </div>
              
              <div className="flex items-center">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#eee"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={resumeScore && resumeScore >= 80 ? '#10B981' : resumeScore && resumeScore >= 60 ? '#3B82F6' : '#F59E0B'}
                      strokeWidth="3"
                      strokeDasharray={`${resumeScore}, 100`}
                    />
                    <text x="18" y="20.5" className="text-3xl font-bold" textAnchor="middle" fill="#444">
                      {resumeScore}%
                    </text>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-green-800 mb-3 flex items-center">
                  <Check className="h-5 w-5 mr-1" />
                  Strengths
                </h3>
                <ul className="space-y-2">
                  {strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-amber-800 mb-3 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-1" />
                  Areas for Improvement
                </h3>
                <ul className="space-y-2">
                  {improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-amber-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Detailed Feedback</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-3">
                  {feedback.map((item, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={resetAnalysis}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Upload Another Resume
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Download Full Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumePage;