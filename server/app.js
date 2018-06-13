const express = require( 'express');
const mongoose = require('mongoose');
const CONST = require('./constans');


const { PORT, URL_DB } = CONST;
const app = express();

mongoose.connect(URL_DB);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connect db');
});

app.get('/', (req, res) => {
  console.log('Hello world');
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log(`listening on port ${ PORT }`);
});
