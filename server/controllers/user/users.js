const formidable = require('formidable');
const validator = require('validator');
const bcrypt = require('bcrypt');
const approve = require('approvejs');
const jwt = require('jsonwebtoken');
const { User } = require('../../model/User/userSchema');
const CONST = require( '../../constants' );
const { PORT, URL_DB, secret } = CONST;
const { validateEmail, validateName, validateMiddleName, validateGender, validateAge } = require('../../validate');


exports.getUser = (req, res, next) => {
  User.findOne({
    _id: req.user.payload.userId
  }).then(user => {
    res.send(user);
  }).catch(err => {
    console.log(err);
  })
};

exports.userAdd = (req, res, next) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if(err) {
      res.status(400).send(err);
      return;
    }

    const {email, age, first, middle, surname, gender, photo} = fields;
    console.log( email, age, first, middle, surname, gender, photo );

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
};

exports.userEdit = (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, { email, age, first, middle, surname, gender, photo }, files) => {
    err ? (res.status(400).send({messege: err})) : null;
    let resultsValidate = [], resultErrors = [];

    const emailValid = approve.value(email, validateEmail);
    const ageValid = approve.value(age, validateAge);
    const genderValid = approve.value(gender, validateGender);
    const firstValid = approve.value(first, validateName);
    const surnameValid = approve.value(surname, validateName);
    const middleValid = approve.value(middle, validateMiddleName);

    resultsValidate.push( emailValid, ageValid, genderValid );
    resultsValidate.map(field => {
      return !field.approved ?  resultErrors.push(field.errors.message) : null;
    });

    if(resultErrors.length >= 1) {
      res.send({success: false, message: resultErrors}); return;
    } else if ( !firstValid.approved ) {
      res.send({success: false, message: 'first'}); return;
    } else if ( !surnameValid.approved ) {
      res.send({success: false, message: 'surname'}); return;
    }else if ( !middleValid.approved ) {
      res.send({success: false, message: 'middle'}); return;
    }

    User.find({
      email: email.toLocaleLowerCase()
    }).then(users => {
      if(users.length >= 1 && String( users[0]._id ) !== req.user.payload.userId){
        res.send({field: 'email', message: 'Email is busy!', success: false});
      } else {
        User.findOneAndUpdate(
          { _id: req.user.payload.userId },
          {
            name: first,
            email: email.toLocaleLowerCase(),
            age, surname, middle, gender, photo
          }).then(user => {
            User.findOne({_id: user._id}).then(user => {
              res.send({user, success: true});
            }).catch(err => { console.log( err ) })
          }).catch(err => { console.log(err) })
      }}).catch(err => { console.log( err ) })

  });
};

exports.usersSearch = (req, res, next) => {
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
};

exports.userSignIn = (req, res, next) => {
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
    console.log( err );
  })
};