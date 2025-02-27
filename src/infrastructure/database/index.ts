/* eslint-disable @typescript-eslint/no-unused-vars */

import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle(process.env.DATABASE_URL!);
