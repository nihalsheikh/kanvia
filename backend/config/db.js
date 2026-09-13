import { Pool } from "pg";
import { env, isProd } from "./envConfig.js";

const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: isProd ? { rejectUnauthorized: false } : false, // change to true if error in console
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Error listener for idle clients
pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL pool error:", err);
});

const query = (text, params) => pool.query(text, params);

const withTransaction = async (callback) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export { pool, query, withTransaction };
