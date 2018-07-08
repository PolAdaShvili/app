const fs = require('fs');
const cors = require('cors');
const express = require( 'express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
db.on('error', console.error.bind(console, 'CONNECT DB ERROR:'));
db.once('open', () => {
  console.log('CONNECT DB')
});

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
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

app.get('/api/user/auth', authenticate, (req, res) => {
  User.findOne({
    _id: req.user.payload.userId
  }).then(user => {
    res.send(user);
  }).catch(err => {
    console.log(err);
  })
});

app.post('/api/user/search', authenticate, (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if(err){
      res.status(400).send(err);
      return;
    }

    User.find({
      name: new RegExp( fields.search , 'i' )
    }).then(users => {
      const data = users.splice(0, 50).filter(item => {
        if(String(item._id) === req.user.payload.userId){
          return false;
        } else {
          return true;
        }
      })
      res.send(data);
    }).catch(err => {
      console.log( err );
    })

  });
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

  form.parse(req, (err, fields, files) => {
    if(err){
      res.status(400).send(err);
      return;
    }
    const { email, age, first, middle, surname, gender, photo } = fields;
    User.find({
      email: fields.email.toLocaleLowerCase()
    }).then(users => {
      if(users.length >= 1 && String( users[0]._id ) !== req.user.payload.userId){
        res.send({message: 'email busy'});
      } else {
        User.findOneAndUpdate( { _id: req.user.payload.userId }, {
            name: first,
            email: email.toLocaleLowerCase(),
            age, surname, middle, gender, photo
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
    }).catch(err => {
      console.log( err );
    })

  });
});

app.put('/api/user/friend', authenticate, (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) =>{
    const {friends} = fields;

    User.findOne({
      _id: friends
    }).then(user => {
      if(user && friends.length === 24){
        User.findOneAndUpdate({ _id: req.user.payload.userId }, {
          $push: { friends: friends }
        }).then(user => {
          User.findOne({
            _id: req.user.payload.userId
          }).then(newUser => {
            res.send(newUser);
          }).catch(err => {
            console.log( err );
          })
        }).catch(err => {
          console.log( err );
        })
      }
    }).catch(err => {
      console.log( err );
    })

  });
});

app.put('/api/user/frienddel', authenticate, (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) =>{
    const {friend} = fields;

    User.findOneAndUpdate({ _id: req.user.payload.userId }, {
      $pull: { friends: friend }
    }).then(user => {
      User.findOne({
        _id: req.user.payload.userId
      }).then(newUser => {
        res.send(newUser);
      })
    }).catch(err => {
      console.log( err );
    })

  });
});

app.get('/api/user/friends', authenticate, (req, res) => {
  User.findOne({
    _id: req.user.payload.userId
  }).then(user => {
    User.find({
      _id : {  $in :  user.friends  }
    }).then(users => {
      res.send({
        users,
        success: true
      });
    }).catch(err => {
      console.log( err );
    })
  }).catch(err => {
    console.log( err );
  })
});

app.put('/api/user/post', authenticate, (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) =>{
    const { post, photos } = fields;
    User.findOne({
      _id: req.user.payload.userId
    }).then(user => {
      User.findOneAndUpdate({ _id: req.user.payload.userId }, {
        $push: {posts: {
          author: `${user.name} ${user.surname}`,
            avatar: user.photo, post, photo: photos
          }}
      }).then(user => {
        User.find({
          _id : {  $in :  user.friends  }
        }).then(newUser => {
          res.send(newUser);
        }).catch(err => {
          console.log( err );
        })
      }).catch(err => {
        console.log( err );
      })
    }).catch(err => {
      console.log( err );
    })

  });
});

app.get('/api/user/posts', authenticate, (req, res) => {
  User.findOne({
    _id: req.user.payload.userId
  }).then(user => {
    User.find({
      _id : {  $in :  user.friends  }
    }).then(users => {
      const allPosts = [];
      users.forEach(friend => {
        friend.posts.forEach(friendP => { allPosts.push(friendP) })
      });
      user.posts.length >= 1 ? allPosts.push(...user.posts) : null
      res.send({
        allPosts,
        success: true
      })
    }).catch(err => {
      console.log( err );
    })
  }).catch(err => {
    console.log( err );
  })
});

app.post('/api/user', (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if(err){
      res.status(400).send(err);
      return;
    }

    const {email, age, first, middle, surname, gender, photo} = fields;

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
            age, surname, middle, gender, photo,
            password: hash, friends: []
          })
          user
          .save()
          .then(user => {
            const payload = {
              userId: user._id
            };
            jwt.sign({ payload }, secret, ( err, token ) => {
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
