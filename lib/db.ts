import postgres from 'postgres';

const sql = postgres({
  host: 'localhost',
  port: 5432,
  database: 'alison_assessment',
  username: 'postgres',
  password: 'postgres',
  max: 20,
});

export default sql;