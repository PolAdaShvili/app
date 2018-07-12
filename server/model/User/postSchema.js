const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
  userId: String,
  avatar: String,
  posts: [{
    post: [{
      avatar: String,
      author: String,
      userId: String,
      postBody: String,
      postPhotos: Array,
      date:{ type: Date, default: Date.now() }
    }]
  }]
});

const Post = mongoose.model('Post', postSchema);


module.exports = {
  Post
};
