/*
  # Create initial schema for career counselor app

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `full_name` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `assessments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `skills` (text array)
      - `interests` (text array)
      - `education_level` (text)
      - `education_field` (text)
      - `education_gpa` (text)
      - `work_environment` (text array)
      - `work_style` (text array)
      - `salary_preference` (text)
      - `location_preference` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `career_recommendations`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `average_salary` (text)
      - `growth_rate` (text)
      - `education` (text)
      - `skills` (text array)
      - `match_score` (integer)
      - `tasks` (text array)
      - `tags` (text array)
      - `created_at` (timestamp)
    
    - `courses`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `platform` (text)
      - `instructor` (text)
      - `price` (text)
      - `duration` (text)
      - `level` (text)
      - `rating` (numeric)
      - `rating_count` (integer)
      - `skills` (text array)
      - `image_url` (text)
      - `url` (text)
      - `careers` (text array)
      - `created_at` (timestamp)
    
    - `user_saved_careers`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `career_id` (uuid, references career_recommendations)
      - `saved_at` (timestamp)
    
    - `user_saved_courses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `course_id` (uuid, references courses)
      - `saved_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Public read access to career and course recommendations
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  skills text[] DEFAULT ARRAY[]::text[],
  interests text[] DEFAULT ARRAY[]::text[],
  education_level text,
  education_field text,
  education_gpa text,
  work_environment text[] DEFAULT ARRAY[]::text[],
  work_style text[] DEFAULT ARRAY[]::text[],
  salary_preference text,
  location_preference text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

CREATE TABLE IF NOT EXISTS career_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  average_salary text,
  growth_rate text,
  education text,
  skills text[] DEFAULT ARRAY[]::text[],
  match_score integer,
  tasks text[] DEFAULT ARRAY[]::text[],
  tags text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  platform text,
  instructor text,
  price text,
  duration text,
  level text,
  rating numeric,
  rating_count integer,
  skills text[] DEFAULT ARRAY[]::text[],
  image_url text,
  url text,
  careers text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_saved_careers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  career_id uuid NOT NULL REFERENCES career_recommendations(id) ON DELETE CASCADE,
  saved_at timestamptz DEFAULT now(),
  UNIQUE(user_id, career_id)
);

CREATE TABLE IF NOT EXISTS user_saved_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  saved_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_saved_careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_saved_courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own assessment"
  ON assessments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own assessment"
  ON assessments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own assessment"
  ON assessments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can view career recommendations"
  ON career_recommendations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view courses"
  ON courses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view own saved careers"
  ON user_saved_careers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save careers"
  ON user_saved_careers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved careers"
  ON user_saved_careers FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own saved courses"
  ON user_saved_courses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save courses"
  ON user_saved_courses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved courses"
  ON user_saved_courses FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);