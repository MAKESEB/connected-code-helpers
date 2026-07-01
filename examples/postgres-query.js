// PostgreSQL: selected App = PostgreSQL, selected connection = your PostgreSQL connection.
const result = await connection.sql.query(
  'select $1::text as message, current_database() as database',
  ['hello from connected code']
);
return result.rows;
