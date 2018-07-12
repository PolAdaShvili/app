const express = require("express");
const newsControllers = require('../controllers/news/news');
const auth = require('../middleware/auth');
const router = express.Router();

//    GET
router.get('/', auth, newsControllers.getPosts);
router.get('/all', auth, newsControllers.getAllPosts);
//    POST
router.post('/', auth, newsControllers.setPost);
//    DELETE
router.delete('/', auth, newsControllers.deletePost);


module.exports = router;