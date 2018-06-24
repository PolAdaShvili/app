const cors = require('cors');
const express = require( 'express');
const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const fs = require('fs');
const Grid = require('gridfs-stream');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const validator = require('validator');
const formidable = require('formidable');
const CONST = require( './constants' );
const { Session } = require('./model/Session/sessionSchema');
const { User } = require('./model/User/userSchema');
let gfs;
const app = express();
const db = mongoose.connection;
const urlencodedParser = bodyParser.urlencoded({extended: false});
const { PORT, URL_DB } = CONST;


Grid.mongo = mongoose.mongo;
app.use(cors());
app.use(cookieParser());
app.use( bodyParser.json() );
app.use(retrieveUser);
app.use('/static', express.static(__dirname + '/public'));

mongoose.connect(URL_DB);
db.on('error', console.error.bind(console, 'CONNECT DB ERROR:'));
db.once('open', () => {
  gfs = Grid(db.db);
  console.log('CONNECT DB')
});

function retrieveUser (req, res, next) {
  if(!req.cookies.auth){
    next();
    return;
  }

  Session.findOne({
    hash: req.cookies.auth
  }).then(session => {
    if (!session) {
      throw new Error('Cannot find session');
    }

    return User.findOne({
      _id: session.userId
    })
  }).then(user => {
    if (!user) {
      throw new Error('Cannot find user');
    }

    req.auth = { user };
    next();
  }).catch(err => {
    res.status(500).send(err.message);
  })
}

function authenticate(req, res, next) {
  if (req.auth && req.auth.user) {
    next();
  } else {
    res.status(403).send('Not authenticated');
  }
}

//app.get('/api/users', (req, res) => {
//  User.find().then(users => {
//    console.log('USERS----->',users);
//    res.send({
//      users
//    });
//  })
//  .catch(err => {
//    res.status(500).send('Error');
//    console.log(err);
//  });
//});


app.post('/api/user', (req, res) => {

  const form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    if(err){
      res.status(400).send(err);
      return;
    }

    const {email, age, first, middle, surname, gender} = fields;

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
    const noErrors = requiredFields.every(value => value);

    if(noErrors){

      User.findOne({
        email: fields.email
      }).then(user => {
        if(user){
          res.send('--such user already exists---');
        } else {
          const user = new User({
            name: first,
            age, email, surname, middle, gender,
            password: Math.random().toString(36).slice(-8)
          });
          user
          .save()
          .then(user => {
            const writestream = gfs.createWriteStream({
              filename: `photo_${user._id}`
            });
            fs.createReadStream(files.photo.path).pipe(writestream);

            const expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);

            const session = new Session({
              userId: user._id,
              hash: uuidv1(),
              expire_at: expireDate
            });
            session
            .save()
            .then(session => {
              res.cookie('auth', session.hash, {maxAge: 864000000});
              res.send(user);
            });
            return session;
          })
          .catch(err => {
            console.log('ERROR ADD USER', err);
          });
        }
      });
    } else{
      console.log(isReadyFirstName, isReadySurName, isReadyAge, isReadyEmail, isReadyGender);
      res.status(400).send('Validation error');
      return;
    }
  });

} );

app.get('/api/user/avatar', authenticate, (req, res) => {
  const readstream = gfs.createReadStream({
    filename: `photo_${req.auth.user._id}`
  });
  readstream.pipe(res);
});

app.listen(PORT, () => {
  console.log(`listening on port ${ PORT }`);
});