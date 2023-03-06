import express from 'express';
import bodyParser from 'body-parser';
import mongoose, { connect } from 'mongoose';

const app = express();
const port = 3000;


app.use(bodyParser.json());


mongoose
  .connect("mongodb://mongo:vPi6MYTGjSkkhMtJYhqY@containers-us-west-105.railway.app:6364")
  .then(() => {
    console.log('Connected to database');
  
  })
  .catch((error) => {
    console.log('Error connecting to database:', error);
  });


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    
});


