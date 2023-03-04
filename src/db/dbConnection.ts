import { Pool } from 'pg';

require('dotenv').config();

const { PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD } = process.env;



const pool = new Pool({
    host: PGHOST,
    port: Number(PGPORT),
    database: PGDATABASE,
    user: PGUSER,
    password: PGPASSWORD
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});



pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to database');
});

export default pool;