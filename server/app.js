const fs = require('fs');
const cors = require('cors');
const express = require( 'express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Grid = require('gridfs-stream');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const validator = require('validator');
const formidable = require('formidable');


let gfs;
const app = express();
const db = mongoose.connection;
const CONST = require( './constants' );
const urlencodedParser = bodyParser.urlencoded({extended: false});
const { User } = require('./model/User/userSchema');
const { PORT, URL_DB, secret } = CONST;


app.use(cors());
app.use( bodyParser.json() );
app.use('/static', express.static(__dirname + '/public'));

mongoose.connect(URL_DB);
Grid.mongo = mongoose.mongo;
db.on('error', console.error.bind(console, 'CONNECT DB ERROR:'));
db.once('open', () => {
  gfs = Grid(db.db);
  console.log('CONNECT DB')
});

function authenticate(req, res, next) {
  if( req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization') ) {
    try {
      req.user = jwt.verify(req.headers['authorization'], secret);
    } catch(err) {
      return res.status(401).json({
        error: {
          msg: 'Failed to authenticate token!'
        }
      });
    }
  } else {
    return res.status(401).json({
      error: {
        msg: 'No token!'
      }
    });
  }
  next();
  return;
}

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/user/auth', authenticate, (req, res) => {
  User.findOne({
    _id: req.user.payload.userId
  }).then(user => {
    res.send(user);
  }).catch(err => {
    console.log(err);
  })
});

app.get('/api/user/avatar', authenticate, (req, res) => {
  const readstream = gfs.createReadStream({
    filename: `photo_${req.user.payload.userId}`
  });
  res.set( {
    'Content-Type': 'image/png'
  });
  readstream.pipe(res);
});

app.post('/api/user/login', urlencodedParser, (req, res) => {
  User.findOne({
    email: req.body.login.toLocaleLowerCase()
  })
  .then(user => {
    if(!user){
      res.json({ success: false, err_login: 'Authentication failed. User not found.' });
    } else if(user) {
      if(!bcrypt.compareSync(req.body.psw, user.password)){
        res.json({ success: false, err_password: 'Authentication failed. Wrong password.' });
      } else {
        const payload = {
          userId: user._id
        };
        jwt.sign({payload}, secret, (err, token) => {
          res.send({
            user,
            token,
            success: true
          })
        });
      }
    }
  }).catch( err => {
    console.log( '/api/user/login__err-->', err );
  })
});

app.put('/api/user/edit', authenticate, (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    if(err){
      res.status(400).send(err);
      return;
    }
    const {email, age, first, middle, surname, gender} = fields;

    User.find({
      email: fields.email.toLocaleLowerCase()
    }).then(users => {
      console.log( 'USER->',users );
      if(users.length >= 1){
        res.send({message: 'email busy'});
      } else {
        User.findOneAndUpdate( { _id: req.user.payload.userId },
          {
            name: first,
            email: email.toLocaleLowerCase(),
            age, surname, middle, gender
          }
        ).then(user => {
          User.findOne({
            _id: user._id
          }).then(newUser => {
            res.send(newUser);
          })
        }).catch(err => {
          console.log(err);
        })
      }
    })

  });
});

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
      const psw = Math.random().toString(36).slice(-8);
      const hash = bcrypt.hashSync(psw, 10);

      User.findOne({
        email: fields.email.toLocaleLowerCase()
      }).then(user => {
        if(user){
          res.json({message: 'email busy'})
        } else {
          const user = new User({
            name: first,
            email: email.toLocaleLowerCase(),
            age, surname, middle, gender,
            password: hash
          })
          user
          .save()
          .then(user => {
            const writestream = gfs.createWriteStream({
              filename: `photo_${user._id}`
            });
            fs.createReadStream(files.photo.path).pipe(writestream);
            const payload = {
              userId: user._id
            };
            jwt.sign({payload}, secret, (err, token) => {
              res.json({
                token,
                user,
                password: psw
              })
            });
          })
          .catch(err => {
            console.log('/api/user__ERROR ADD USER--->', err);
          });
        }
      });
    } else{
      res.status(400).send('Validation error');
      return;
    }
  });

} );

app.listen(PORT, () => {
  console.log(`listening on port ${ PORT }`);
});