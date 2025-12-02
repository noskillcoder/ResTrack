# 🚀 Quick Start Guide - Supabase Authentication

## ⚡ 5-Minute Setup

### 1. Create Supabase Project
- Go to https://supabase.com
- Click "Start your project"
- Create new project (wait 2-3 minutes)
- Name: `maverick-shift-manager`

### 2. Get API Keys
1. In Supabase dashboard → **Settings** → **API**
2. Copy **Project URL** and **anon/public key**

### 3. Setup Environment
Create `.env.local` in project root:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Create Database Tables
1. In Supabase → **SQL Editor**
2. Copy contents of `supabase/schema.sql`
3. Click **Run**

### 5. Enable Authentication
1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Save

### 6. Run Your App
```bash
npm run dev
```

## ✅ Done!

You can now:
- ✅ Sign up new users
- ✅ Sign in with email/password
- ✅ User sessions persist
- ✅ Protected routes work automatically

## 📝 Next Steps

1. Create your first admin user (sign up with role "admin")
2. Create worker accounts
3. Start posting tasks!

## 🆘 Need Help?

Check `SUPABASE_SETUP.md` for detailed instructions.


