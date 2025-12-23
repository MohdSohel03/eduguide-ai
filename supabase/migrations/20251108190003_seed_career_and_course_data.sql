/*
  # Seed career recommendations and courses

  Inserts initial career recommendations and courses data into the database
*/

INSERT INTO career_recommendations (title, description, average_salary, growth_rate, education, skills, match_score, tasks, tags)
VALUES
  (
    'Data Scientist',
    'Analyze complex data sets to identify trends and insights that drive business decisions. Combine statistics, programming, and domain knowledge to extract valuable information from data.',
    '$120,000 - $150,000',
    '22%',
    'Bachelor''s or Master''s in Statistics, Computer Science, or related field',
    ARRAY['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization', 'Problem Solving'],
    92,
    ARRAY['Build and implement machine learning models', 'Clean and preprocess large datasets', 'Create data visualizations and dashboards', 'Present insights to stakeholders', 'Develop predictive models and algorithms'],
    ARRAY['technology', 'analysis']
  ),
  (
    'UX/UI Designer',
    'Create user-centered designs for digital products that are both functional and visually appealing. Focus on enhancing user satisfaction by improving usability, accessibility, and interaction design.',
    '$85,000 - $110,000',
    '13%',
    'Bachelor''s in Design, HCI, or related field',
    ARRAY['Wireframing', 'Prototyping', 'User Research', 'Visual Design', 'UI Design', 'Interaction Design'],
    87,
    ARRAY['Conduct user research and usability testing', 'Create wireframes and prototypes', 'Design intuitive user interfaces', 'Collaborate with developers to implement designs', 'Iterate based on user feedback'],
    ARRAY['design', 'creative']
  ),
  (
    'Product Manager',
    'Lead product development efforts by identifying customer needs, defining product vision, and working with cross-functional teams to bring products to market successfully.',
    '$110,000 - $140,000',
    '10%',
    'Bachelor''s in Business, Computer Science, or related field',
    ARRAY['Product Strategy', 'User Stories', 'Market Research', 'Agile Methodology', 'Stakeholder Management', 'Communication'],
    85,
    ARRAY['Define product vision and strategy', 'Conduct market research and competitive analysis', 'Create product roadmaps and specifications', 'Prioritize features and requirements', 'Coordinate with engineering, design, and marketing teams'],
    ARRAY['management', 'business']
  ),
  (
    'Full Stack Developer',
    'Design and implement both front-end and back-end components of web applications. Combine technical expertise with creativity to build complete, functional software solutions.',
    '$100,000 - $130,000',
    '15%',
    'Bachelor''s in Computer Science or related field',
    ARRAY['JavaScript', 'HTML/CSS', 'React', 'Node.js', 'SQL', 'Git', 'Problem Solving'],
    90,
    ARRAY['Build responsive user interfaces with modern frameworks', 'Develop server-side logic and APIs', 'Implement database design and data models', 'Troubleshoot and debug applications', 'Collaborate with design and product teams'],
    ARRAY['technology', 'development']
  ),
  (
    'Digital Marketing Specialist',
    'Develop and implement marketing strategies across digital channels to drive brand awareness, engagement, and conversions. Analyze campaign performance and optimize marketing efforts.',
    '$65,000 - $90,000',
    '8%',
    'Bachelor''s in Marketing, Communications, or related field',
    ARRAY['SEO', 'Content Marketing', 'Social Media', 'Email Marketing', 'Analytics', 'Copywriting'],
    82,
    ARRAY['Create and manage digital marketing campaigns', 'Optimize content for search engines', 'Analyze campaign performance and ROI', 'Manage social media accounts and content', 'Develop and execute email marketing strategies'],
    ARRAY['marketing', 'business']
  ),
  (
    'Cybersecurity Analyst',
    'Protect organizations from digital threats by monitoring networks, implementing security measures, and responding to incidents. Help safeguard sensitive data and critical infrastructure.',
    '$95,000 - $120,000',
    '31%',
    'Bachelor''s in Cybersecurity, Computer Science, or related field',
    ARRAY['Network Security', 'Threat Analysis', 'Incident Response', 'Security Tools', 'Risk Assessment'],
    78,
    ARRAY['Monitor networks for security breaches', 'Investigate security incidents and vulnerabilities', 'Implement security measures and controls', 'Conduct risk assessments and penetration testing', 'Develop security policies and procedures'],
    ARRAY['technology', 'security']
  );

INSERT INTO courses (title, description, platform, instructor, price, duration, level, rating, rating_count, skills, image_url, url, careers)
VALUES
  (
    'Data Science Specialization',
    'Master the skills needed to succeed in data science. Learn Python, statistics, machine learning, and data visualization through hands-on projects.',
    'Coursera',
    'Johns Hopkins University',
    '$49/month',
    '6 months',
    'Intermediate',
    4.7,
    28546,
    ARRAY['Python', 'Machine Learning', 'Data Analysis', 'Statistics'],
    'https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    '#',
    ARRAY['Data Scientist', 'Data Analyst', 'Machine Learning Engineer']
  ),
  (
    'UX Design Professional Certificate',
    'Prepare for a career in UX design with this comprehensive program. Learn user research, wireframing, prototyping, and design thinking.',
    'Coursera',
    'Google',
    '$39/month',
    '6 months',
    'Beginner',
    4.8,
    15872,
    ARRAY['User Research', 'Wireframing', 'Prototyping', 'Figma'],
    'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    '#',
    ARRAY['UX/UI Designer', 'Product Designer', 'Interaction Designer']
  ),
  (
    'The Complete Web Developer Bootcamp',
    'Become a full-stack web developer. Learn HTML, CSS, JavaScript, Node.js, React, MongoDB, and more through practical projects.',
    'Udemy',
    'Dr. Angela Yu',
    '$94.99',
    '65 hours',
    'Beginner to Intermediate',
    4.7,
    156984,
    ARRAY['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
    'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    '#',
    ARRAY['Full Stack Developer', 'Front-End Developer', 'Web Developer']
  ),
  (
    'Product Management Fundamentals',
    'Learn the essential skills of product management. Understand how to identify customer needs, define product strategy, and lead development teams.',
    'edX',
    'Boston University',
    'Free (Certificate: $199)',
    '8 weeks',
    'Intermediate',
    4.5,
    3254,
    ARRAY['Product Strategy', 'User Stories', 'Market Research', 'Agile'],
    'https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    '#',
    ARRAY['Product Manager', 'Product Owner', 'Program Manager']
  ),
  (
    'Digital Marketing Specialization',
    'Master digital marketing strategies across multiple channels. Learn SEO, social media, content marketing, and analytics to drive business growth.',
    'Coursera',
    'University of Illinois',
    '$49/month',
    '8 months',
    'Beginner to Intermediate',
    4.6,
    12458,
    ARRAY['SEO', 'Social Media Marketing', 'Content Marketing', 'Analytics'],
    'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    '#',
    ARRAY['Digital Marketing Specialist', 'Content Strategist', 'Social Media Manager']
  ),
  (
    'Cybersecurity Fundamentals',
    'Develop essential cybersecurity skills to protect organizations from digital threats. Learn network security, threat analysis, and incident response.',
    'edX',
    'RITx',
    'Free (Certificate: $249)',
    '8 weeks',
    'Beginner',
    4.7,
    5872,
    ARRAY['Network Security', 'Threat Analysis', 'Risk Assessment'],
    'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    '#',
    ARRAY['Cybersecurity Analyst', 'Security Engineer', 'Information Security Specialist']
  ),
  (
    'Machine Learning',
    'Learn the fundamentals of machine learning. Understand algorithms, neural networks, and practical applications through hands-on projects.',
    'Coursera',
    'Stanford University',
    'Free (Certificate: $79)',
    '11 weeks',
    'Intermediate',
    4.9,
    158742,
    ARRAY['Machine Learning', 'Python', 'TensorFlow', 'Neural Networks'],
    'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    '#',
    ARRAY['Data Scientist', 'Machine Learning Engineer', 'AI Researcher']
  ),
  (
    'Agile Project Management',
    'Master agile methodologies to lead successful projects. Learn Scrum, Kanban, and other frameworks to deliver value efficiently.',
    'LinkedIn Learning',
    'Kelley O''Connell',
    '$29.99/month',
    '12 hours',
    'Intermediate',
    4.6,
    4527,
    ARRAY['Agile', 'Scrum', 'Kanban', 'Project Planning'],
    'https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    '#',
    ARRAY['Project Manager', 'Scrum Master', 'Product Owner']
  ),
  (
    'Graphic Design Fundamentals',
    'Learn essential graphic design principles and tools. Master composition, typography, color theory, and digital design software.',
    'Udemy',
    'Lindsay Marsh',
    '$84.99',
    '21 hours',
    'Beginner',
    4.7,
    32541,
    ARRAY['Adobe Photoshop', 'Illustrator', 'Typography', 'Color Theory'],
    'https://images.pexels.com/photos/1059120/pexels-photo-1059120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    '#',
    ARRAY['Graphic Designer', 'UI Designer', 'Visual Designer']
  );