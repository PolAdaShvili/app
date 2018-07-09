const formidable = require('formidable');
const { User } = require('../../model/User/userSchema');

exports.setNews = (req, res, next) => {
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
};

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
      })
    }).catch(err => {
      console.log( err );
    })
  }).catch(err => {
    console.log( err );
  })
};