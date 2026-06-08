// src/lib/api.js

// This takes the URL from your Environment Variables (Vercel/Render)
// If it's missing, it defaults to your local backend.
export const API_URL = process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:5000";