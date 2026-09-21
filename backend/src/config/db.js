import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { ENV } from "./env.js";
import * as schema from '../db/schema.js'

// conectei o drizzle ao db para mudar os dados diretamente do código

const sql = neon(ENV.DATABASE_URL)
export const db = drizzle(sql, {schema})