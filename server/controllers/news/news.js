const formidable = require('formidable');
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
      res.send({ posts })

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
          friends: user.friends,
          $push: { posts: { post: { postBody, postPhotos} } }
        }).then(savedPost => {

          Post.findOne({
            _id: savedPost._id
          }).then(posts => {
            res.send({ posts, user });
          }).catch(err => {console.log( err );});
        }).catch(err => { console.log( err ); });

      } else {

        const newPost = new Post({
          userId: user._id,
          friends: user.friends,
          posts: { post: { postBody, postPhotos } }
        })
        newPost.save().then(posts => {
          res.send({ posts, user });
        }).catch(err => { console.log( err ); })

      }

    }).catch(err => { console.log( err ); });
  }).catch(err => { console.log( err ); });

};




//    OldRouts!!! +++
exports.setNews = (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse( req, ( err, {post, photos}, files ) =>{
    User.findOne({
      _id: req.user.payload.userId
    }).then(user => {

      User.findOneAndUpdate({ _id: req.user.payload.userId }, {
        $push: {posts: {
            author: `${user.name} ${user.surname}`, avatar: user.photo, post, photo: photos
          }
        }
      }).then(user => {

        User.find({
          _id : {  $in :  user.friends  }
        }).then(newUser => {
          res.send(newUser);
        } ).catch( err =>{
          console.log( err );
        } )
      } ).catch( err =>{
        console.log( err );
      } )
    } ).catch( err =>{
      console.log( err );
    } )
  });
};
//    OldRouts!!!
exports.getNews = (req, res, next) => {
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
      } );
    } ).catch( err =>{
      console.log( err );
    } )
  } ).catch( err =>{
    console.log( err );
  } )
};