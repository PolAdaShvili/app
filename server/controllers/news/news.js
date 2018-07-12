const formidable = require('formidable');
const { sortFunction } = require('../../constants');
const { User } = require('../../model/User/userSchema');
const { Post } = require('../../model/User/postSchema');

//    GET
exports.getPosts = (req, res, next) => {
  User.findOne({
    _id: req.user.payload.userId
  }).then(user => {

    Post.findOne({
      userId: String(user._id)
    }).then(posts => {
      posts ? ( posts.posts.reverse(), res.send({ posts }) ) : res.end();
    }).catch(err => { console.log( err ); });
  }).catch(err => { console.log( err ); });
};
exports.getAllPosts =  (req, res, next) => {
  User.findOne({
    _id: req.user.payload.userId
  }).then(user => {

    Post.findOne({
      userId: String(user._id)
    }).then(posts => {
      let allPosts = [];

      Post.find({userId: user.friends }).then(friendPost => {
        if(posts){
          posts.posts.map(item => {
            allPosts.push(...item.post);
          })
        }

        friendPost.map(item => {
          item ? item.posts.map(postFriend => {
            allPosts.push(...postFriend.post);
          }) : null
        })

        allPosts.sort(sortFunction);
        res.send({
          allPosts
        });
      })

    }).catch(err => { console.log( err ); });
  }).catch(err => { console.log( err ); });
};
//    POST
exports.setPost = (req, res, next) => {
  const { postBody, postPhotos } = req.body;

  User.findOne({
    _id: req.user.payload.userId
  }).then(user => {
    Post.findOne({
      userId: String(user._id)
    }).then(post => {
      if(post){

        Post.findOneAndUpdate({_id: post._id},{
          $push: {
            posts: {
              post: {
                userId: user._id, postBody, date: new Date(),
                author: `${user.name} ${user.surname}`, avatar: user.photo, postPhotos
              }
            }
          }
        }).then(savedPost => {

          Post.findOne({
            _id: savedPost._id
          }).then(posts => {
            posts.posts.reverse();
            res.send({ posts, user });
          }).catch(err => {console.log( err );});
        }).catch(err => { console.log( err ); });

      } else {

        const newPost = new Post({
          userId: user._id, date: new Date(),
          posts: {
            post: {
              userId: user._id, postBody, date: new Date(),
              author: `${user.name} ${user.surname}`, avatar: user.photo, postPhotos
            }
          }
        })
        newPost.save().then(posts => {
          res.send({ posts, user });
        }).catch(err => { console.log( err ); })

      }

    }).catch(err => { console.log( err ); });
  }).catch(err => { console.log( err ); });

};
//    DELETE
exports.deletePost = (req, res, next) => {
  const { postsID, postID } = req.body;
  Post.findOneAndUpdate({_id: postsID},{
    $pull: {posts: { _id:  postID} }
  }).then(post => {
    Post.findOne({
      _id: postsID
    }).then(posts => {
      posts.posts.reverse();
      res.send({posts});
    }).catch(err => {console.log( err );})
  }).catch(err => {console.log( err );})
};