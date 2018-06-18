const express = require( 'express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const CONST = require( './constants' );
const Schema = require('./model/User/userSchema');


const app = express();
const db = mongoose.connection;
const { PORT, URL_DB } = CONST;
const { User } = Schema;
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(cors());
app.use( bodyParser.json() );
app.use('/static', express.static(__dirname + '/public'));

mongoose.connect(URL_DB);

db.on('error', console.error.bind(console, 'Connection db error:'));
db.once('open', () => {
  console.log('Connect db');
});

app.get('/', (req, res) => {
  console.log('Hello world');
  res.send('Hello world');
});

app.get('/api/users', (req, res) => {
  User.find().then(users => {
    res.send({
      users
    });
  })
    .catch(err => {
      res.status(500).send('Error');
      console.log(err);
    });
});

app.listen(PORT, () => {
  console.log(`listening on port ${ PORT }`);
});

app.post("/user", urlencodedParser, (request, response) => {
  response.send(response.data);
});