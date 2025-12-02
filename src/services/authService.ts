import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { UserRole } from '@/data/mockData';

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  hall?: string;
  subHall?: string;
  workerType?: 'student' | 'gmw';
}

export interface SignInData {
  email: string;
  password: string;
}

const checkConfiguration = () => {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase not configured. Please create .env.local file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. See SUPABASE_SETUP.md for instructions.'
    );
  }
};

export const authService = {
  async signUp(data: SignUpData) {
    checkConfiguration();

    // Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
          role: data.role,
        },
      },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Failed to create user');

    // Create user profile in public.users table
    const { error: profileError } = await supabase.from('users').insert({
      id: authData.user.id,
      email: data.email,
      name: data.name,
      role: data.role,
      hall: data.hall || null,
      sub_hall: data.subHall || null,
      worker_type: data.workerType || null,
    });

    if (profileError) {
      // If profile creation fails, the user is still created in auth
      // but we should log the error
      console.error('Failed to create user profile:', profileError);
      throw new Error('Account created but profile setup failed. Please contact support.');
    }

    return authData;
  },

  async signIn(data: SignInData) {
    checkConfiguration();

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      // Provide more user-friendly error messages
      if (error.message.includes('Invalid login')) {
        throw new Error('Invalid email or password');
      }
      throw error;
    }
    return authData;
  },

  async signOut() {
    checkConfiguration();

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    if (!isSupabaseConfigured) return null;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  },

  async getUserProfile(userId: string) {
    checkConfiguration();

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  },
};

