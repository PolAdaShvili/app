const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  name: {type: String, require: true},
  surname: {type: String, require: true},
  middle: String,
  email: {type: String, require: true},
  photo: Object,
  gender: {type: String, require: true},
  age: {type: String, require: true},
  password: {type: String, require: true},
  friends: Array
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User
};
