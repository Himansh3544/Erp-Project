# MERN ERP

A modular ERP starter in MERN with advanced UI and AI integration stubs.

## Quickstart

1. Copy `.env.example` to `.env` and adjust values
2. Ensure MongoDB is running locally (mongodb://localhost:27017) or set `MONGODB_URI` to your MongoDB Atlas connection string
3. Install deps

```bash
npm install
```

4. Run dev (server + web)

```bash
npm run dev
```

Server: http://localhost:4000
Web: http://localhost:5173

## Apps
- apps/server: Express + Mongoose + JWT + Zod, AI chat endpoint
- apps/web: React + Vite + Tailwind + React Query + Router

## AI
Set `OPENAI_API_KEY` to enable real responses. Without it, a deterministic mock is used.
