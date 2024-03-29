import pg from 'pg'

// export default defineNuxtPlugin(() => {});

export const pool: pg.Pool = new pg.Pool();

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});