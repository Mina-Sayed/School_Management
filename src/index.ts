import express from 'express';
import bodyParser from 'body-parser';
import pool from './db/dbConnection';

const app = express();
const port = 3000;

pool.connect();

app.use(bodyParser.json());



app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
