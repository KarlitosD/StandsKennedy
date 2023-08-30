import postgres from 'postgres'
import { drizzle } from "drizzle-orm/postgres-js"

import * as schema from "../utils/schema"

import "dotenv/config"

const url = process.env.DB_URL ?? ""
const sql = postgres(url)
export const db = drizzle(sql, { schema })


