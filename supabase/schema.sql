-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'worker')),
  hall TEXT,
  sub_hall TEXT,
  worker_type TEXT CHECK (worker_type IN ('student', 'gmw')),
  is_working_today BOOLEAN DEFAULT false,
  hours_scheduled INTEGER DEFAULT 0,
  hours_worked INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('Normal', 'High')),
  status TEXT NOT NULL CHECK (status IN ('Available', 'In Progress', 'Completed')),
  assigned_to UUID REFERENCES public.users(id),
  assigned_by_name TEXT DEFAULT 'Admin',
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Schedules table
CREATE TABLE IF NOT EXISTS public.schedules (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  worker_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  day TEXT NOT NULL CHECK (day IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
  start_time TEXT,
  end_time TEXT,
  hours DECIMAL(4, 2),
  week_start_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(worker_id, day, week_start_date)
);

-- Worker hours tracking
CREATE TABLE IF NOT EXISTS public.worker_hours (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  worker_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  week_start_date DATE NOT NULL,
  hours_picked DECIMAL(6, 2) DEFAULT 0,
  hours_completed DECIMAL(6, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(worker_id, week_start_date)
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_hours ENABLE ROW LEVEL SECURITY;

-- Policies for users table
CREATE POLICY "Users can view all users"
  ON public.users FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can update any user"
  ON public.users FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policies for tasks table
CREATE POLICY "Everyone can view available tasks"
  ON public.tasks FOR SELECT
  USING (status = 'Available' OR assigned_to = auth.uid() OR assigned_to IS NULL);

CREATE POLICY "Users can view their assigned tasks"
  ON public.tasks FOR SELECT
  USING (assigned_to = auth.uid());

CREATE POLICY "Admins can create tasks"
  ON public.tasks FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can update tasks they're assigned to"
  ON public.tasks FOR UPDATE
  USING (assigned_to = auth.uid());

CREATE POLICY "Admins can update any task"
  ON public.tasks FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policies for schedules table
CREATE POLICY "Users can view all schedules"
  ON public.schedules FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their own schedule"
  ON public.schedules FOR ALL
  USING (worker_id = auth.uid());

-- Policies for worker_hours table
CREATE POLICY "Users can view all worker hours"
  ON public.worker_hours FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own hours"
  ON public.worker_hours FOR UPDATE
  USING (worker_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON public.tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON public.tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_schedules_worker_id ON public.schedules(worker_id);
CREATE INDEX IF NOT EXISTS idx_schedules_week_start ON public.schedules(week_start_date);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_schedules_updated_at BEFORE UPDATE ON public.schedules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


