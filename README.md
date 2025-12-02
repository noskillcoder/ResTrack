## ResTrack – MSU Mankato Worker Management

This app helps MSU Mankato residence hall staff manage:

- Worker sign-in by role (admin vs worker, including student / GMW workers)
- Task feed and task posting
- Schedules and hours tracking
- Admin worker overviews and a daily message generator

### Tech stack

- Vite + React + TypeScript
- React Router
- Tailwind CSS + shadcn/ui
- Supabase (auth + database)

### Running locally

```bash
npm install
npm run dev
```

Create a `.env.local` with your Supabase credentials:

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```
