const express = require("express");
const newsControllers = require('../controllers/news/news');
const auth = require('../middleware/auth');
const router = express.Router();

//    GET
router.get('/', auth, newsControllers.getPosts);
//    POST
router.post('/', auth, newsControllers.setPost);
//    DELETE
//router.delete('/', auth, newsControllers.deletePost);


/////  OldRouts!!!  ///////////////////////////
router.put('/', auth , newsControllers.setNews);
router.get('/', auth , newsControllers.getNews);
///////////////////////////////////////////////

module.exports = router;