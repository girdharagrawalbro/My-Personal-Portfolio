-- Supabase Database Schema for Portfolio Admin CRUD Operations
-- Execute these SQL commands in your Supabase SQL editor

-- Enable RLS (Row Level Security)
-- This ensures users can only access their own data

-- 1. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL DEFAULT 'fullstack',
    tags TEXT[] DEFAULT '{}',
    url VARCHAR(500),
    github VARCHAR(500),
    image VARCHAR(500),
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    last_updated DATE NOT NULL DEFAULT CURRENT_DATE,
    featured BOOLEAN DEFAULT false,
    status VARCHAR(50) DEFAULT 'published', -- published, draft, archived
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Experience Table
CREATE TABLE IF NOT EXISTS experiences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    duration VARCHAR(100) NOT NULL,
    type VARCHAR(100) DEFAULT 'Full-time', -- Full-time, Part-time, Contract, Freelance, Internship
    description TEXT NOT NULL,
    skills TEXT[] DEFAULT '{}',
    achievements TEXT[] DEFAULT '{}',
    start_date DATE NOT NULL,
    end_date DATE,
    current BOOLEAN DEFAULT false,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Education Table
CREATE TABLE IF NOT EXISTS educations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    degree VARCHAR(255) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    duration VARCHAR(100) NOT NULL,
    grade VARCHAR(100),
    description TEXT NOT NULL,
    skills TEXT[] DEFAULT '{}',
    achievements TEXT[] DEFAULT '{}',
    start_date DATE NOT NULL,
    end_date DATE,
    current BOOLEAN DEFAULT false,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL DEFAULT 'Other',
    level INTEGER NOT NULL CHECK (level >= 1 AND level <= 10),
    icon VARCHAR(100),
    color VARCHAR(7) DEFAULT '#3B82F6', -- Hex color
    description TEXT NOT NULL,
    years_experience NUMERIC(3,1) DEFAULT 1.0,
    projects TEXT[] DEFAULT '{}',
    featured BOOLEAN DEFAULT false,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Contact Messages Table (for contact form submissions)
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'unread', -- unread, read, responded, archived
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Portfolio Analytics Table (optional - for tracking views, etc.)
CREATE TABLE IF NOT EXISTS analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page VARCHAR(255) NOT NULL,
    views INTEGER DEFAULT 1,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(page, date)
);

-- Create indexes for better performance
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_status ON projects(status);

CREATE INDEX idx_experiences_user_id ON experiences(user_id);
CREATE INDEX idx_experiences_current ON experiences(current);

CREATE INDEX idx_educations_user_id ON educations(user_id);
CREATE INDEX idx_educations_current ON educations(current);

CREATE INDEX idx_skills_user_id ON skills(user_id);
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_featured ON skills(featured);

CREATE INDEX idx_contact_messages_status ON contact_messages(status);

-- Set up Row Level Security (RLS) policies

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE educations ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Projects
CREATE POLICY "Users can view their own projects" ON projects
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own projects" ON projects
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" ON projects
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects" ON projects
    FOR DELETE USING (auth.uid() = user_id);

-- Public read access for published projects (for portfolio display)
CREATE POLICY "Anyone can view published projects" ON projects
    FOR SELECT USING (status = 'published');

-- RLS Policies for Experiences
CREATE POLICY "Users can manage their own experiences" ON experiences
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view experiences" ON experiences
    FOR SELECT USING (true);

-- RLS Policies for Education
CREATE POLICY "Users can manage their own education" ON educations
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view education" ON educations
    FOR SELECT USING (true);

-- RLS Policies for Skills
CREATE POLICY "Users can manage their own skills" ON skills
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view skills" ON skills
    FOR SELECT USING (true);

-- RLS Policies for Contact Messages (admin only)
CREATE POLICY "Admin can view all contact messages" ON contact_messages
    FOR SELECT USING (auth.uid() IN (
        SELECT id FROM auth.users WHERE email = 'your-admin-email@example.com'
    ));

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update timestamps
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at
    BEFORE UPDATE ON experiences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_educations_updated_at
    BEFORE UPDATE ON educations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at
    BEFORE UPDATE ON skills
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Sample data insertion (optional)
-- You can uncomment and modify these to add initial data

/*
-- Sample Projects
INSERT INTO projects (title, description, category, tags, url, github, image, user_id) VALUES
('Portfolio Website', 'Personal portfolio website built with React and TypeScript', 'frontend', ARRAY['React', 'TypeScript', 'Tailwind CSS'], 'https://yourportfolio.com', 'https://github.com/username/portfolio', 'portfolio.jpg', auth.uid()),
('E-commerce Platform', 'Full-stack e-commerce application with payment integration', 'fullstack', ARRAY['React', 'Node.js', 'MongoDB', 'Stripe'], 'https://yourecommerce.com', 'https://github.com/username/ecommerce', 'ecommerce.jpg', auth.uid());

-- Sample Experience
INSERT INTO experiences (title, company, location, duration, type, description, skills, achievements, start_date, current, user_id) VALUES
('Full Stack Developer', 'Tech Company', 'New York, NY', 'Jan 2023 - Present', 'Full-time', 'Developing web applications using modern technologies', ARRAY['React', 'Node.js', 'MongoDB'], ARRAY['Increased performance by 40%', 'Led team of 5 developers'], '2023-01-01', true, auth.uid());

-- Sample Education
INSERT INTO educations (degree, institution, location, duration, grade, description, skills, achievements, start_date, end_date, user_id) VALUES
('Master of Computer Applications', 'University Name', 'City, State', '2021 - 2023', '8.5 CGPA', 'Advanced computer science degree focusing on software development', ARRAY['Data Structures', 'Algorithms', 'Database Management'], ARRAY['1st Rank at College Level', 'Best Project Award'], '2021-08-01', '2023-05-31', auth.uid());

-- Sample Skills
INSERT INTO skills (name, category, level, color, description, years_experience, projects, featured, user_id) VALUES
('React', 'Frontend', 9, '#61DAFB', 'Advanced React development with hooks and performance optimization', 3.0, ARRAY['Portfolio', 'E-commerce App'], true, auth.uid()),
('Node.js', 'Backend', 8, '#339933', 'Backend development with Express.js and REST APIs', 2.5, ARRAY['API Gateway', 'Chat App'], true, auth.uid()),
('MongoDB', 'Database', 7, '#47A248', 'NoSQL database design and optimization', 2.0, ARRAY['User Management', 'CMS'], false, auth.uid());
*/