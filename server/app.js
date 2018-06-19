const express = require( 'express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const validator = require('validator');
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

db.on('error', console.error.bind(console, 'CONNECT DB ERROR:'));
db.once('open', () => { console.log('CONNECT DB') });

app.get('/api/users', (req, res) => {
  User.find().then(users => {
    res.send({
      users
    });
  })
    .catch(err => {
      res.status(500).send('Error', err);
    });
});


app.post("/api/user", urlencodedParser, (request, response) => {
  const {email, age, first, middle, surname, photo, gender} = request.body.data;
  const isReadyGender = validator.isLength(gender, {min: 4, max: 6});
  const isReadyEmail = validator.isEmail(email);
  let isReadyFirstName, isReadySurName, isReadyAge;

  if(validator.isAlpha(first)){
    isReadyFirstName = validator.isLength(first, {minimum: 3, maximum: 32});
  }
  if(validator.isAlpha(surname)){
    isReadySurName = validator.isLength(surname, {minimum: 3, maximum: 32});
  }
  if(validator.isNumeric(age)){
    isReadyAge = validator.isInt(age, {min: 1, max: 99});
  }

  const requiredFields = [isReadyFirstName, isReadySurName, isReadyAge, isReadyEmail, isReadyGender];
  const errors = requiredFields.every(value => {
    if(value){
      return true;
    } else{
      return false;
    }
  });

  if(errors){
    const user = new User({
      name: first,
      age, email, surname, middle, gender, photo,
      password: String(Math.random()).slice(-5)
    });

    user
    .save()
    .then(res => {
      response.send(res);
    })
    .catch(err => {
      console.log('ERROR ADD USER', err);
    });
  } else{
    debugger;
    console.log('Error! not validation');
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${ PORT }`);
});