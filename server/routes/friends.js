const express = require("express");
const router = express.Router();

const friendsControllers = require('../controllers/friends/friends');
const auth = require('../middleware/auth');

router.post('/', auth , friendsControllers.friendsAdd);
router.get('/', auth , friendsControllers.getFriends);
router.put('/', auth , friendsControllers.friendDelete);


module.exports = router;