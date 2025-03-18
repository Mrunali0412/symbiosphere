const moment = require('moment-timezone');
require('dotenv').config();
const express = require('express');
const { Client } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

client.connect();

app.get('/', (req, res) => {
  res.send('Hello from SymbioSphere Backend!');
});

app.get('/testdb', async (req, res) => {
    try {
      const result = await client.query('SELECT NOW()');
      const postgresTime = moment(result.rows[0].now).tz('Asia/Kolkata');
      res.send(postgresTime.format());
    } catch (error) {
      res.send(error);
    }
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});