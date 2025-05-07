export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          email: string | null;
          role: 'student' | 'teacher' | 'admin' | 'parent';
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          role?: 'student' | 'teacher' | 'admin' | 'parent';
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          role?: 'student' | 'teacher' | 'admin' | 'parent';
        };
      };
      parent_student_relationships: {
        Row: {
          id: string;
          parent_id: string;
          student_id: string;
          created_at: string;
          relationship_type: string | null;
        };
        Insert: {
          id?: string;
          parent_id: string;
          student_id: string;
          created_at?: string;
          relationship_type?: string | null;
        };
        Update: {
          id?: string;
          parent_id?: string;
          student_id?: string;
          created_at?: string;
          relationship_type?: string | null;
        };
      };
      classes: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          description: string | null;
          teacher_id: string;
          image_url: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          description?: string | null;
          teacher_id: string;
          image_url?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          description?: string | null;
          teacher_id?: string;
          image_url?: string | null;
        };
      };
      enrollments: {
        Row: {
          id: string;
          created_at: string;
          student_id: string;
          class_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          student_id: string;
          class_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          student_id?: string;
          class_id?: string;
        };
      };
      assignments: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          description: string | null;
          due_date: string;
          class_id: string;
          points: number | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          description?: string | null;
          due_date: string;
          class_id: string;
          points?: number | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          description?: string | null;
          due_date?: string;
          class_id?: string;
          points?: number | null;
        };
      };
      submissions: {
        Row: {
          id: string;
          created_at: string;
          student_id: string;
          assignment_id: string;
          content: string | null;
          file_url: string | null;
          grade: number | null;
          feedback: string | null;
          is_graded: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          student_id: string;
          assignment_id: string;
          content?: string | null;
          file_url?: string | null;
          grade?: number | null;
          feedback?: string | null;
          is_graded?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          student_id?: string;
          assignment_id?: string;
          content?: string | null;
          file_url?: string | null;
          grade?: number | null;
          feedback?: string | null;
          is_graded?: boolean;
        };
      };
      announcements: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          content: string;
          author_id: string;
          class_id: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          content: string;
          author_id: string;
          class_id?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          content?: string;
          author_id?: string;
          class_id?: string | null;
        };
      };
      parent_notifications: {
        Row: {
          id: string;
          created_at: string;
          parent_id: string;
          student_id: string;
          type: 'grade' | 'attendance' | 'behavior' | 'announcement';
          content: string;
          is_read: boolean;
          reference_id: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          parent_id: string;
          student_id: string;
          type: 'grade' | 'attendance' | 'behavior' | 'announcement';
          content: string;
          is_read?: boolean;
          reference_id?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          parent_id?: string;
          student_id?: string;
          type?: 'grade' | 'attendance' | 'behavior' | 'announcement';
          content?: string;
          is_read?: boolean;
          reference_id?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}; 