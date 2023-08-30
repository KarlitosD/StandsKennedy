import type { Config } from "drizzle-kit";
import "dotenv/config"

export default {
    schema: "server/utils/schema.ts",
    out: "server/db/migrations",
    breakpoints: true,
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.DB_URL as string
    }
} satisfies Config