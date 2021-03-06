const formidable = require('formidable');
const { User } = require('../../model/User/userSchema');

exports.friendsAdd = (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse( req, ( err, {friendId}, files ) =>{
    User.findOne({
      _id: friendId
    }).then(user => {
      if ( user && friendId.length === 24 ) {
        User.findOneAndUpdate({ _id: req.user.payload.userId }, {
          $push: {friends: friendId}
        }).then(user => {

          User.findOne({
            _id: req.user.payload.userId
          }).then(newUser => {
            res.send(newUser);
          } ).catch( err =>{
            console.log( err )
          } )
        } ).catch( err =>{
          console.log( err )
        } )
      }
    } ).catch( err =>{
      console.log( err )
    } );

  });
};

exports.getFriends = (req, res, next) => {
  User.findOne({
    _id: req.user.payload.userId
  }).then(user => {

    User.find({
      _id : {  $in :  user.friends  }
    }).then(users => {
      res.json({
        users,
        success: true
      });
    } ).catch( err =>{
      console.log( err )
    } )
  } ).catch( err =>{
    console.log( err )
  } );

};

exports.friendDelete = (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse( req, ( err, {friend}, files ) =>{

    User.findOneAndUpdate({ _id: req.user.payload.userId }, {
      $pull: { friends: friend }
    }).then(user => {
      User.findOne({
        _id: req.user.payload.userId
      }).then(newUser => {
        res.send(newUser);
      })
    } ).catch( err =>{
      console.log( err );
    } )

  });
};
