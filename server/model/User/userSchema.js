const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  photo: String,
  gender: String,
  age: Number
});
const User = mongoose.model('User', userSchema);

module.exports = {
  User
};
