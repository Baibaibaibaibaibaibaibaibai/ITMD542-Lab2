var express = require('express');
var router = express.Router();

/* Address Book home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Address Book' });
});

module.exports = router;
