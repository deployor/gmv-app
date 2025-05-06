-- Create profiles table for user profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  updated_at TIMESTAMP WITH TIME ZONE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  email TEXT,
  role TEXT CHECK (role IN ('student', 'teacher', 'admin', 'parent')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- First, remove ALL policies
DROP POLICY IF EXISTS profiles_select ON public.profiles;
DROP POLICY IF EXISTS profiles_update ON public.profiles;
DROP POLICY IF EXISTS profiles_insert ON public.profiles;
DROP POLICY IF EXISTS profiles_admin_all ON public.profiles;
DROP POLICY IF EXISTS profiles_system_all ON public.profiles;
DROP POLICY IF EXISTS profiles_service_role ON public.profiles;
DROP POLICY IF EXISTS profiles_service_update ON public.profiles;
DROP POLICY IF EXISTS profiles_service_all ON public.profiles;

-- DISABLE Row Level Security for profiles for now
-- This will allow all operations by default
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Create classes table
CREATE TABLE IF NOT EXISTS public.classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  image_url TEXT
);

-- Create RLS policy for classes
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;

-- Allow users to select all classes
DROP POLICY IF EXISTS classes_select ON public.classes;
CREATE POLICY classes_select ON public.classes
  FOR SELECT USING (true);

-- Allow teachers to insert/update/delete only their own classes
DROP POLICY IF EXISTS classes_insert ON public.classes;
CREATE POLICY classes_insert ON public.classes
  FOR INSERT WITH CHECK (auth.uid() = teacher_id);

DROP POLICY IF EXISTS classes_update ON public.classes;
CREATE POLICY classes_update ON public.classes
  FOR UPDATE USING (auth.uid() = teacher_id);

DROP POLICY IF EXISTS classes_delete ON public.classes;
CREATE POLICY classes_delete ON public.classes
  FOR DELETE USING (auth.uid() = teacher_id);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  UNIQUE(student_id, class_id)
);

-- Create RLS policy for enrollments
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Allow students to see their own enrollments
DROP POLICY IF EXISTS enrollments_select ON public.enrollments;
CREATE POLICY enrollments_select ON public.enrollments
  FOR SELECT USING (auth.uid() = student_id);

-- Allow teachers to see enrollments for their classes
DROP POLICY IF EXISTS enrollments_select_teacher ON public.enrollments;
CREATE POLICY enrollments_select_teacher ON public.enrollments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.classes
      WHERE classes.id = enrollments.class_id
      AND classes.teacher_id = auth.uid()
    )
  );

-- Allow teachers to insert enrollments for their classes
DROP POLICY IF EXISTS enrollments_insert ON public.enrollments;
CREATE POLICY enrollments_insert ON public.enrollments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.classes
      WHERE classes.id = enrollments.class_id
      AND classes.teacher_id = auth.uid()
    )
  );

-- Allow students to enroll themselves in classes
DROP POLICY IF EXISTS enrollments_self_insert ON public.enrollments;
CREATE POLICY enrollments_self_insert ON public.enrollments
  FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Allow students to delete their own enrollments
DROP POLICY IF EXISTS enrollments_delete ON public.enrollments;
CREATE POLICY enrollments_delete ON public.enrollments
  FOR DELETE USING (auth.uid() = student_id);

-- Create assignments table
CREATE TABLE IF NOT EXISTS public.assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  points INTEGER DEFAULT 100
);

-- Create RLS policy for assignments
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to see assignments
DROP POLICY IF EXISTS assignments_select ON public.assignments;
CREATE POLICY assignments_select ON public.assignments
  FOR SELECT USING (true);

-- Allow teachers to insert/update/delete assignments for their classes
DROP POLICY IF EXISTS assignments_insert ON public.assignments;
CREATE POLICY assignments_insert ON public.assignments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.classes
      WHERE classes.id = assignments.class_id
      AND classes.teacher_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS assignments_update ON public.assignments;
CREATE POLICY assignments_update ON public.assignments
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.classes
      WHERE classes.id = assignments.class_id
      AND classes.teacher_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS assignments_delete ON public.assignments;
CREATE POLICY assignments_delete ON public.assignments
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.classes
      WHERE classes.id = assignments.class_id
      AND classes.teacher_id = auth.uid()
    )
  );

-- Create submissions table
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE,
  content TEXT,
  file_url TEXT,
  grade INTEGER,
  feedback TEXT,
  is_graded BOOLEAN DEFAULT false,
  UNIQUE(student_id, assignment_id)
);

-- Create RLS policy for submissions
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Allow students to see their own submissions
DROP POLICY IF EXISTS submissions_select_student ON public.submissions;
CREATE POLICY submissions_select_student ON public.submissions
  FOR SELECT USING (auth.uid() = student_id);

-- Allow teachers to see submissions for their assignments
DROP POLICY IF EXISTS submissions_select_teacher ON public.submissions;
CREATE POLICY submissions_select_teacher ON public.submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.assignments a
      JOIN public.classes c ON a.class_id = c.id
      WHERE a.id = submissions.assignment_id
      AND c.teacher_id = auth.uid()
    )
  );

-- Allow students to insert/update their own submissions
DROP POLICY IF EXISTS submissions_insert ON public.submissions;
CREATE POLICY submissions_insert ON public.submissions
  FOR INSERT WITH CHECK (auth.uid() = student_id);

DROP POLICY IF EXISTS submissions_update_student ON public.submissions;
CREATE POLICY submissions_update_student ON public.submissions
  FOR UPDATE USING (auth.uid() = student_id AND NOT is_graded);

-- Allow teachers to update grades and feedback
DROP POLICY IF EXISTS submissions_update_teacher ON public.submissions;
CREATE POLICY submissions_update_teacher ON public.submissions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.assignments a
      JOIN public.classes c ON a.class_id = c.id
      WHERE a.id = submissions.assignment_id
      AND c.teacher_id = auth.uid()
    )
  );

-- Create announcements table
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE
);

-- Create RLS policy for announcements
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Allow anyone to see announcements
DROP POLICY IF EXISTS announcements_select ON public.announcements;
CREATE POLICY announcements_select ON public.announcements
  FOR SELECT USING (true);

-- Allow teachers to insert/update/delete announcements for their classes
DROP POLICY IF EXISTS announcements_insert ON public.announcements;
CREATE POLICY announcements_insert ON public.announcements
  FOR INSERT WITH CHECK (
    auth.uid() = author_id AND
    (
      class_id IS NULL OR
      EXISTS (
        SELECT 1 FROM public.classes
        WHERE classes.id = announcements.class_id
        AND classes.teacher_id = auth.uid()
      )
    )
  );

DROP POLICY IF EXISTS announcements_update ON public.announcements;
CREATE POLICY announcements_update ON public.announcements
  FOR UPDATE USING (
    auth.uid() = author_id AND
    (
      class_id IS NULL OR
      EXISTS (
        SELECT 1 FROM public.classes
        WHERE classes.id = announcements.class_id
        AND classes.teacher_id = auth.uid()
      )
    )
  );

DROP POLICY IF EXISTS announcements_delete ON public.announcements;
CREATE POLICY announcements_delete ON public.announcements
  FOR DELETE USING (
    auth.uid() = author_id AND
    (
      class_id IS NULL OR
      EXISTS (
        SELECT 1 FROM public.classes
        WHERE classes.id = announcements.class_id
        AND classes.teacher_id = auth.uid()
      )
    )
  );

-- Create parent-student relationship table
CREATE TABLE IF NOT EXISTS public.parent_student_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  relationship_type TEXT,
  UNIQUE(parent_id, student_id)
);

-- Enable RLS for parent-student relationships
ALTER TABLE public.parent_student_relationships ENABLE ROW LEVEL SECURITY;

-- Parents can see their own relationships
DROP POLICY IF EXISTS parent_student_relationships_select_parent ON public.parent_student_relationships;
CREATE POLICY parent_student_relationships_select_parent ON public.parent_student_relationships
  FOR SELECT USING (auth.uid() = parent_id);

-- Students can see who their parents are
DROP POLICY IF EXISTS parent_student_relationships_select_student ON public.parent_student_relationships;
CREATE POLICY parent_student_relationships_select_student ON public.parent_student_relationships
  FOR SELECT USING (auth.uid() = student_id);

-- Allow admin users to manage parent-student relationships
DROP POLICY IF EXISTS parent_student_relationships_all_admin ON public.parent_student_relationships;
CREATE POLICY parent_student_relationships_all_admin ON public.parent_student_relationships
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Create parent notifications table
CREATE TABLE IF NOT EXISTS public.parent_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  parent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('grade', 'attendance', 'behavior', 'announcement')) NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  reference_id UUID,
  FOREIGN KEY (parent_id, student_id) REFERENCES public.parent_student_relationships(parent_id, student_id) ON DELETE CASCADE
);

-- Enable RLS for parent notifications
ALTER TABLE public.parent_notifications ENABLE ROW LEVEL SECURITY;

-- Parents can see their own notifications
DROP POLICY IF EXISTS parent_notifications_select ON public.parent_notifications;
CREATE POLICY parent_notifications_select ON public.parent_notifications
  FOR SELECT USING (auth.uid() = parent_id);

-- Only the parent can update their own notification read status
DROP POLICY IF EXISTS parent_notifications_update ON public.parent_notifications;
CREATE POLICY parent_notifications_update ON public.parent_notifications
  FOR UPDATE USING (auth.uid() = parent_id);

-- Modify RLS policies to allow parents to view their children's data

-- Allow parents to see their children's submissions
DROP POLICY IF EXISTS submissions_select_parent ON public.submissions;
CREATE POLICY submissions_select_parent ON public.submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.parent_student_relationships
      WHERE parent_student_relationships.parent_id = auth.uid()
      AND parent_student_relationships.student_id = submissions.student_id
    )
  );

-- Allow parents to see their children's enrollments
DROP POLICY IF EXISTS enrollments_select_parent ON public.enrollments;
CREATE POLICY enrollments_select_parent ON public.enrollments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.parent_student_relationships
      WHERE parent_student_relationships.parent_id = auth.uid()
      AND parent_student_relationships.student_id = enrollments.student_id
    )
  );

-- Update the new user trigger function to support parent role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  role_value TEXT;
BEGIN
  -- Get the role from metadata or default to 'student'
  role_value := COALESCE(NEW.raw_user_meta_data->>'role', 'student');
  
  -- Insert into profiles
  INSERT INTO public.profiles (id, full_name, avatar_url, email, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.email,
    role_value
  );
  
  -- No longer need to set JWT claim, as we'll use the profiles table for role checks
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call handle_new_user function on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user(); 