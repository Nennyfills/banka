import { Pool } from "pg";
import env from "dotenv";

env.config();

let pool = null;

if (process.env.NODE_ENV === "test") {
  pool = new Pool({
    database: process.env.DATABASETEST,
  });
} else {
  pool = new Pool({
    database: process.env.DATABASE_URL,
    user: process.env.HEROKUUSER,
    password: process.env.HEROKUPASSWORD,
    port: process.env.HEROKUPORT,
    host: process.env.HEROKUHOST,
    ssl: true,
  });
}

export default pool;
