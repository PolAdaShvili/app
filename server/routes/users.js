const express = require("express");
const router = express.Router();


const usersControllers = require('../controllers/user/users');
const auth = require('../middleware/auth');

router.get('/', auth, usersControllers.getUser);
router.post('/search', auth , usersControllers.usersSearch);
router.post('/', usersControllers.userAdd);
router.post('/login', usersControllers.userSignIn);
router.put('/edit', auth , usersControllers.userEdit);


module.exports = router;