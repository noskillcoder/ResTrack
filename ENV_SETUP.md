# Environment Setup

## Step 1: Create `.env.local` file

In your project root, create a file named `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 2: Get Your Supabase Credentials

1. Go to https://supabase.com
2. Sign in and select your project
3. Click **Settings** (gear icon) → **API**
4. Copy:
   - **Project URL** → paste as `VITE_SUPABASE_URL`
   - **anon/public key** → paste as `VITE_SUPABASE_ANON_KEY`

## Step 3: Set Up Database

1. In Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `supabase/schema.sql`
3. Click **Run** to create all tables

## Step 4: Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure email templates (optional)

## Step 5: Test

Run your app:
```bash
npm run dev
```

You should now be able to:
- Sign up new users
- Sign in existing users
- See user profile when logged in

## Troubleshooting

- **"Missing Supabase environment variables"**: Make sure `.env.local` exists and has correct values
- **CORS errors**: Check that your Supabase URL is correct
- **Auth not working**: Verify Email provider is enabled in Supabase dashboard


