import { supabase } from './supabase';

export const databaseService = {
  assessments: {
    async saveAssessment(userId: string, assessmentData: any) {
      const { data, error } = await supabase
        .from('assessments')
        .upsert({
          user_id: userId,
          skills: assessmentData.skills || [],
          interests: assessmentData.interests || [],
          education_level: assessmentData.education?.level,
          education_field: assessmentData.education?.field,
          education_gpa: assessmentData.education?.gpa,
          work_environment: assessmentData.preferences?.workEnvironment || [],
          work_style: assessmentData.preferences?.workStyle || [],
          salary_preference: assessmentData.preferences?.salary,
          location_preference: assessmentData.preferences?.location,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });

      return { data, error };
    },

    async getAssessment(userId: string) {
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      return { data, error };
    },
  },

  careers: {
    async getCareerRecommendations() {
      const { data, error } = await supabase
        .from('career_recommendations')
        .select('*')
        .order('created_at', { ascending: false });

      return { data, error };
    },

    async getSavedCareers(userId: string) {
      const { data, error } = await supabase
        .from('user_saved_careers')
        .select('career_id, career_recommendations(*)')
        .eq('user_id', userId);

      return { data, error };
    },

    async savCareer(userId: string, careerId: string) {
      const { data, error } = await supabase
        .from('user_saved_careers')
        .insert({
          user_id: userId,
          career_id: careerId,
        });

      return { data, error };
    },

    async unsaveCareer(userId: string, careerId: string) {
      const { error } = await supabase
        .from('user_saved_careers')
        .delete()
        .eq('user_id', userId)
        .eq('career_id', careerId);

      return { error };
    },
  },

  courses: {
    async getCourses() {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      return { data, error };
    },

    async getSavedCourses(userId: string) {
      const { data, error } = await supabase
        .from('user_saved_courses')
        .select('course_id, courses(*)')
        .eq('user_id', userId);

      return { data, error };
    },

    async saveCourse(userId: string, courseId: string) {
      const { data, error } = await supabase
        .from('user_saved_courses')
        .insert({
          user_id: userId,
          course_id: courseId,
        });

      return { data, error };
    },

    async unsaveCourse(userId: string, courseId: string) {
      const { error } = await supabase
        .from('user_saved_courses')
        .delete()
        .eq('user_id', userId)
        .eq('course_id', courseId);

      return { error };
    },
  },

  profiles: {
    async createOrUpdateProfile(userId: string, fullName: string) {
      const { data, error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: userId,
          full_name: fullName,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });

      return { data, error };
    },

    async getProfile(userId: string) {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      return { data, error };
    },
  },
};
