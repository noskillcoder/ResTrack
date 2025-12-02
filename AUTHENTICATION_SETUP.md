# Authentication Setup Guide

## ✅ Current Status

Your authentication is **already fully connected** in the code! Here's how it works:

### Architecture Overview

```
┌─────────────────┐
│  LoginSelector  │ ← UI Component (sign in/sign up forms)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   authService   │ ← Service layer (handles Supabase API calls)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Supabase      │ ← Authentication & Database
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  UserContext    │ ← React Context (manages user state)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Your App       │ ← All components can use useUser() hook
└─────────────────┘
```

### What's Already Connected

1. **LoginSelector Component** (`src/components/LoginSelector.tsx`)
   - Handles sign in and sign up forms
   - Calls `authService.signIn()` and `authService.signUp()`
   - Shows user profile when logged in

2. **Auth Service** (`src/services/authService.ts`)
   - Uses Supabase client for authentication
   - Handles sign up, sign in, sign out
   - Creates user profiles in database

3. **User Context** (`src/contexts/UserContext.tsx`)
   - Wraps your entire app (already in `App.tsx`)
   - Automatically listens to auth state changes
   - Provides `user`, `loading`, `signOut`, `isAdmin` to all components

4. **Supabase Client** (`src/lib/supabase.ts`)
   - Configured and ready to use
   - Checks for environment variables

## 🚀 Setup Steps

To make authentication work, you need to complete these steps:

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign in and create a new project
3. Wait for project to initialize (2-3 minutes)

### Step 2: Get API Credentials

1. In Supabase dashboard → **Settings** (gear icon) → **API**
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJhbG...`)

### Step 3: Create Environment File

Create `.env.local` in your project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important:** 
- Replace with your actual values from Step 2
- Never commit this file to git (it's already in `.gitignore`)

### Step 4: Set Up Database

1. In Supabase dashboard → **SQL Editor**
2. Copy and paste the entire contents of `supabase/schema.sql`
3. Click **Run** to create all tables and policies

This creates:
- `users` table (extends Supabase auth)
- `tasks` table
- `schedules` table
- `worker_hours` table
- Row Level Security (RLS) policies

### Step 5: Enable Email Authentication

1. In Supabase dashboard → **Authentication** → **Providers**
2. Enable **Email** provider (toggle ON)
3. Configure email templates if needed
4. Click **Save**

### Step 6: Test Authentication

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Try signing up:
   - Fill in name, email, password, role
   - Click "Create Account"
   - Check your email for verification (if email confirmation is enabled)

3. Try signing in:
   - Use the email and password you just created
   - You should see your profile card appear

## 🔍 How It Works

### Sign Up Flow

1. User fills form → `LoginSelector` calls `authService.signUp()`
2. `authService` creates user in Supabase Auth
3. `authService` creates profile in `public.users` table
4. `UserContext` detects auth change → fetches user profile
5. User sees their profile card

### Sign In Flow

1. User fills form → `LoginSelector` calls `authService.signIn()`
2. `authService` authenticates with Supabase
3. `UserContext` detects auth change → fetches user profile
4. User sees their profile card

### Sign Out Flow

1. User clicks "Sign Out" → `LoginSelector` calls `signOut()`
2. `UserContext` clears user state
3. User sees login form again

### Automatic Session Management

- `UserContext` automatically checks for existing sessions on app load
- Listens to auth state changes (login/logout from other tabs)
- Persists sessions across page refreshes

## 🛠️ Using Authentication in Your Components

Any component can access user data:

```tsx
import { useUser } from '@/contexts/UserContext';

function MyComponent() {
  const { user, loading, isAdmin, signOut } = useUser();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in</div>;

  return (
    <div>
      <p>Hello, {user.name}!</p>
      <p>Role: {user.role}</p>
      {isAdmin && <p>You are an admin</p>}
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

## 🐛 Troubleshooting

### "Supabase not configured" error
- Check that `.env.local` exists and has correct values
- Restart your dev server after creating `.env.local`

### "Invalid email or password"
- Make sure Email provider is enabled in Supabase dashboard
- Check that you're using the correct email/password

### User profile not showing
- Check browser console for errors
- Verify database tables were created (check Supabase dashboard → Table Editor)
- Make sure RLS policies allow reading user data

### CORS errors
- Verify your Supabase URL is correct
- Check that you're using the `anon` key, not the `service_role` key

## 📝 Next Steps

After authentication is working:

1. ✅ Users can sign up and sign in
2. ✅ User profiles are stored in database
3. ✅ Sessions persist across refreshes
4. ✅ Role-based access (admin vs worker)
5. ✅ Protected routes based on user role

Your authentication is fully integrated and ready to use!

