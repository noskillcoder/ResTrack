# Express + JWT Backend

Complete backend implementation for the Worker Management System.

## Tech Stack

- **Node.js + Express** - Web server
- **PostgreSQL** - Database (or MongoDB/MySQL)
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Prisma** - ORM (optional, makes DB easier)

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install express cors dotenv jsonwebtoken bcryptjs
npm install -D @types/express @types/cors @types/jsonwebtoken @types/bcryptjs typescript ts-node nodemon
```

### 2. Setup Environment Variables

Create `.env`:
```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this
DATABASE_URL=postgresql://user:password@localhost:5432/worker_db
NODE_ENV=development
```

### 3. Run Development Server

```bash
npm run dev
```

## Deployment Options

### Railway (Recommended)
1. Push to GitHub
2. Connect Railway to your repo
3. Add environment variables
4. Deploy!

### Render
1. Create new Web Service
2. Connect GitHub repo
3. Set build command: `npm install`
4. Set start command: `npm start`

### Vercel (Serverless)
- Works great with serverless functions
- Free tier available

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user
- `GET /api/tasks` - Get tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `GET /api/workers` - Get workers
- `GET /api/schedules` - Get schedules
- `POST /api/schedules` - Create/update schedule


