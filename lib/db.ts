import { neon } from "@neondatabase/serverless"

const databaseUrl = process.env.DATABASE_URL

// Return a dummy function during build if DATABASE_URL is not set
export const sql = databaseUrl 
  ? neon(databaseUrl)
  : ((query: string, params?: any[]) => {
      throw new Error("DATABASE_URL is not configured. Please add it to your environment variables.")
    }) as any
