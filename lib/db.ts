import { neon } from "@neondatabase/serverless"

let sql: any

// Only initialize the database connection at runtime
if (process.env.DATABASE_URL) {
  sql = neon(process.env.DATABASE_URL)
} else {
  // Fallback for build time - returns empty results
  sql = async (query: string, ...args: any[]) => {
    console.warn("DATABASE_URL not configured - returning empty results")
    return []
  }
}

export { sql }
