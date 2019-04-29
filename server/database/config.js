import { Pool } from "pg";
import env from "dotenv";

env.config();

const database = process.env.NODE_ENV === "test" ? process.env.DATABASETEST : process.env.PGDATABASE;
const pool = new Pool({
  database,
});

export default pool;
