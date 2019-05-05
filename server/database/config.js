import { Pool } from "pg";
import env from "dotenv";

env.config();


const database = process.env.NODE_ENV === "test" ? process.env.DBCONNECTIONTEST : process.env.DBCONNECTION;
const pool = new Pool({
  connectionString: database,
});

export default pool;
