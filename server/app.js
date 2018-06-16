const express = require( 'express');
const mongoose = require('mongoose');
const cors = require('cors');
const CONST = require('./constans');
const Schema = require('./model/User/userSchema');


const app = express();
const db = mongoose.connection;
const { PORT, URL_DB } = CONST;
const { User } = Schema;

app.use(cors());
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
