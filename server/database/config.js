import { Pool } from "pg";
import env from "dotenv";

env.config();

const myconnection = process.env.TEST_ENV ? process.env.DBCONNECTIONTEST : process.env.DBCONNECTION;
console.log(myconnection);
const pool = new Pool({
  connectionString: myconnection,
});

export default pool;
