const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
  userId: String,
  posts: [{
    post: [{
      postBody: String,
      postPhotos: Array,
      date:{ type: Date, default: Date.now() }
    }]
  }],
  friends: Array
});

const Post = mongoose.model('Post', postSchema);


module.exports = {
  Post
};
