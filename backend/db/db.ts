import { Pool } from 'pg';

export const db = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '1234',
  database: 'happy_pos_db',
  max: 20, //1 pool can have 20 clients
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
