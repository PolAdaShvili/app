const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  name: {type: String, require: true},
  surname: {type: String, require: true},
  middle: {type: String, require: true},
  email: {type: String, require: true},
  photo: String,
  gender: {type: String, require: true},
  age: {type: String, require: true},
  password: {type: String, require: true}
});
const User = mongoose.model('User', userSchema);

module.exports = {
  User
};
