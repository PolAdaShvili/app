const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  name: {type: String, require: true},
  surname: {type: String, require: true},
  middle: String,
  email: {type: String, require: true},
  photo: String,
  gender: {type: String, require: true},
  age: {type: String, require: true},
  password: {type: String, require: true},
  posts: [{
    avatar: String,
    author: String,
    photo: String,
    post: String,
    date:{type: Date, default: Date.now()}
  }],
  friends: Array
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User
};
