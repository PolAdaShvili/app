const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  //res.render();
});
router.get('/user', (req, res, next) => {
  res.send('respond with a resource', res);
});
router.get('/user/detail', function(req, res, next) {
  res.send('detail', res);
});


module.exports = router;