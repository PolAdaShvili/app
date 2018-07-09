const express = require("express");
const router = express.Router();

const newsControllers = require('../controllers/news/news');
const auth = require('../middleware/auth');

router.put('/', auth , newsControllers.setNews);
router.get('/', auth , newsControllers.getNews);


module.exports = router;