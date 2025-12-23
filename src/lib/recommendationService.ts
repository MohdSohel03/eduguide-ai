import { supabase } from './supabase';

interface StudentProfile {
  skills: string[];
  interests: string[];
  education: {
    level: string;
    field: string;
    gpa: string;
  };
  preferences: {
    workEnvironment: string[];
    workStyle: string[];
    salary: string;
    location: string;
  };
}

interface Career {
  id: string;
  title: string;
  description: string;
  required_skills: string[];
  interests: string[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  skills_gained: string[];
}

const calculateMatchScore = (studentData: string[], targetData: string[]): number => {
  if (!studentData || !targetData) return 0;
  const matches = studentData.filter(item =>
    targetData.some(target => target.toLowerCase().includes(item.toLowerCase()))
  );
  return (matches.length / Math.max(studentData.length, targetData.length)) * 100;
};

const generateCareerAdvice = (careers: Career[], profile: StudentProfile): string => {
  if (!careers || careers.length === 0) {
    return "Based on your profile, I recommend exploring different career paths. Take more assessments to get personalized recommendations.";
  }

  const scoredCareers = careers.map(career => ({
    ...career,
    score: (
      calculateMatchScore(profile.skills, career.required_skills || []) * 0.4 +
      calculateMatchScore(profile.interests, career.interests || []) * 0.6
    )
  })).sort((a, b) => b.score - a.score);

  const topCareers = scoredCareers.slice(0, 3).filter(c => c.score > 0);

  if (topCareers.length === 0) {
    return `Based on your interests in ${profile.interests.join(', ') || 'various fields'} and skills in ${profile.skills.join(', ') || 'multiple areas'}, I recommend exploring careers that align with these strengths. Consider developing additional technical skills to broaden your opportunities.`;
  }

  let advice = `Based on your profile, here are the best career matches for you:\n\n`;
  topCareers.forEach((career, index) => {
    advice += `${index + 1}. **${career.title}** (${Math.round(career.score)}% match)\n   ${career.description || 'A promising career path for you.'}\n\n`;
  });

  advice += `You have strong interests in ${profile.interests.slice(0, 2).join(' and ')} and good skills in ${profile.skills.slice(0, 2).join(' and ')}. These align well with these roles.`;

  return advice;
};

const generateCourseRecommendations = (courses: Course[], profile: StudentProfile, allCareers: Career[]): string => {
  if (!courses || courses.length === 0) {
    return "I recommend exploring our course catalog. Courses can help develop skills for your desired career path.";
  }

  const relevantSkillsNeeded = allCareers
    .flatMap(c => c.required_skills || [])
    .filter((skill, i, arr) => arr.indexOf(skill) === i);

  const scoredCourses = courses.map(course => ({
    ...course,
    score: calculateMatchScore(relevantSkillsNeeded, course.skills_gained || [])
  }))
    .filter(c => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (scoredCourses.length === 0) {
    return `Based on your education level (${profile.education?.level || 'not specified'}), I recommend starting with foundational courses to build core competencies in your areas of interest.`;
  }

  let recommendations = `Here are the top courses to help you advance your career:\n\n`;
  scoredCourses.forEach((course, index) => {
    recommendations += `${index + 1}. **${course.title}** (${course.level || 'Intermediate'} Level)\n   ${course.description || 'A valuable learning opportunity.'}\n   Skills: ${(course.skills_gained || []).join(', ')}\n\n`;
  });

  return recommendations;
};

const generateInterviewTips = (profile: StudentProfile): string => {
  const tips = [
    "Research the company thoroughly before your interview. Know their mission, culture, and recent news.",
    "Practice the STAR method (Situation, Task, Action, Result) to answer behavioral questions effectively.",
    `Highlight your skills in ${profile.skills.slice(0, 2).join(' and ')} - these are your strongest assets.`,
    `Be ready to discuss your interests in ${profile.interests.slice(0, 2).join(' and ')} and how they align with the role.`,
    "Prepare 2-3 thoughtful questions for the interviewer to show genuine interest.",
    `Given your ${profile.education?.level} education in ${profile.education?.field || 'your field'}, emphasize relevant coursework and projects.`,
    `Focus on your preferred work style (${profile.preferences?.workStyle?.slice(0, 2)?.join(', ') || 'collaborative'}) and why it makes you effective.`,
    "Practice speaking clearly and calmly. Use pauses to think before answering complex questions.",
  ];

  let response = "Here are personalized interview tips for you:\n\n";
  const selectedTips = tips.slice(0, 5);
  selectedTips.forEach((tip, index) => {
    response += `${index + 1}. ${tip}\n`;
  });

  return response;
};

const generateResumeAdvice = (profile: StudentProfile): string => {
  let advice = "Here's how to tailor your resume for maximum impact:\n\n";

  advice += `1. **Highlight Key Skills**: Feature these prominently: ${profile.skills.join(', ') || 'Your technical and soft skills'}\n\n`;

  advice += `2. **Lead with Relevant Education**: Emphasize your ${profile.education?.level} in ${profile.education?.field || 'your field'}\n\n`;

  advice += `3. **Match Job Descriptions**: Tailor your resume for each application, using keywords from the job posting that match your skills.\n\n`;

  advice += `4. **Show Impact**: Use quantifiable results and metrics in your accomplishments, especially related to your interests in ${profile.interests.slice(0, 2).join(' and ')}.\n\n`;

  advice += `5. **Professional Summary**: Create a 2-3 line summary highlighting your strengths in your target area.\n\n`;

  advice += `6. **Format & Length**: Keep to one page if early career, two if you have significant experience in ${profile.education?.field || 'your field'}.`;

  return advice;
};

const generateSkillDevelopment = (profile: StudentProfile, courses: Course[]): string => {
  const missingSkills = ['Communication', 'Leadership', 'Problem Solving', 'Time Management']
    .filter(skill => !profile.skills.includes(skill));

  let response = "Here's your personalized skill development plan:\n\n";

  response += `**Your Current Strengths**: ${profile.skills.slice(0, 3).join(', ') || 'Various technical skills'}\n\n`;

  if (missingSkills.length > 0) {
    response += `**Skills to Develop**: ${missingSkills.slice(0, 2).join(', ')}\n\n`;

    const relevantCourses = courses
      .filter(c => missingSkills.some(skill =>
        (c.skills_gained || []).some(s => s.toLowerCase().includes(skill.toLowerCase()))
      ))
      .slice(0, 2);

    if (relevantCourses.length > 0) {
      response += `**Recommended Courses**:\n`;
      relevantCourses.forEach(course => {
        response += `- ${course.title}: Helps develop ${(course.skills_gained || []).join(', ')}\n`;
      });
      response += '\n';
    }
  }

  response += `**Action Plan**:\n1. Complete 1-2 online courses in your weak areas\n2. Seek hands-on projects to apply these skills\n3. Join professional groups related to your interests in ${profile.interests[0] || 'your field'}\n4. Request mentorship opportunities to accelerate growth`;

  return response;
};

export const recommendationService = {
  isAvailable: () => true,

  async generateSmartResponse(
    userMessage: string,
    userId: string | null
  ): Promise<string> {
    try {
      if (!userId) {
        return "To get personalized career advice, please log in. This will help me understand your skills, interests, and goals better.";
      }

      const [assessmentRes, careersRes, coursesRes] = await Promise.all([
        supabase.from('assessments').select('*').eq('user_id', userId).maybeSingle(),
        supabase.from('career_recommendations').select('*'),
        supabase.from('courses').select('*'),
      ]);

      const assessment = assessmentRes.data;
      const allCareers: Career[] = careersRes.data || [];
      const allCourses: Course[] = coursesRes.data || [];

      if (!assessment) {
        const keywords = userMessage.toLowerCase();
        if (keywords.includes('career') || keywords.includes('job')) {
          return "I'd love to help you find the right career! Please complete your assessment first so I can understand your skills, interests, and preferences. Visit the Assessment page to get started.";
        }
        if (keywords.includes('course') || keywords.includes('learn')) {
          return "To recommend courses tailored to your goals, I need to know more about you. Complete your assessment to receive personalized learning recommendations.";
        }
        return "I can provide personalized career guidance once you complete your assessment. This helps me understand your unique background and goals.";
      }

      const profile: StudentProfile = {
        skills: assessment.skills || [],
        interests: assessment.interests || [],
        education: {
          level: assessment.education_level || '',
          field: assessment.education_field || '',
          gpa: assessment.education_gpa || '',
        },
        preferences: {
          workEnvironment: assessment.work_environment || [],
          workStyle: assessment.work_style || [],
          salary: assessment.salary_preference || '',
          location: assessment.location_preference || '',
        },
      };

      const messageLower = userMessage.toLowerCase();

      if (messageLower.includes('career') || messageLower.includes('path') || messageLower.includes('job')) {
        return generateCareerAdvice(allCareers, profile);
      }

      if (messageLower.includes('course') || messageLower.includes('learn') || messageLower.includes('skill')) {
        if (messageLower.includes('skill')) {
          return generateSkillDevelopment(profile, allCourses);
        }
        return generateCourseRecommendations(allCourses, profile, allCareers);
      }

      if (messageLower.includes('interview') || messageLower.includes('prepare')) {
        return generateInterviewTips(profile);
      }

      if (messageLower.includes('resume') || messageLower.includes('cv')) {
        return generateResumeAdvice(profile);
      }

      if (messageLower.includes('help') || messageLower.includes('what can')) {
        return `I can help you with:\n\n• **Career Guidance** - Based on your skills and interests\n• **Course Recommendations** - Personalized learning paths\n• **Interview Preparation** - Tips and strategies\n• **Resume Review** - Optimization advice\n• **Skill Development** - Building your strengths\n\nWhat would you like help with?`;
      }

      return generateCareerAdvice(allCareers, profile);
    } catch (error) {
      console.error('Error generating response:', error);
      return "I'm having trouble accessing your profile data. Please try again or check your connection.";
    }
  },
};
