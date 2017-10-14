var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/bytes', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  var filename = req.query.file;
  console.log(filename);
  console.log("received");
  res.send(fs.readFileSync(filename, { encoding: 'base64' }));
});

module.exports = router;
