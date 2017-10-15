var express = require('express');
var router = express.Router();
var youtubedl = require('youtube-dl');
var FileReader = require('filereader');
var multer  = require('multer');
var fs = require('fs');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../inputs/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ 
  storage: storage,
  limits: {fileSize: 9 * 1000000}
});

// Get byte stream for youtube video
router.get('/bytes', function(req, res, next) {
    console.log(req.query.url)
    var video = youtubedl(req.query.url);

    video.on('info', function(info) {
      console.log('Download started');
      console.log('filename: ' + info.filename);
      console.log('size: ' + info.size);
    });

    var fileReader = new FileReader();
    fileReader.readAsDataURL(video);
    res.send(fileReader.result);

  // res.send(fs.readFileSync(filename, { encoding: 'base64' }));
});

// Get byte stream for video
router.post('/upload', upload.single('video'), function(req, res, next) {
  var video = req.file;
  res.send(fs.readFileSync(video.path, { encoding: 'base64' }));
});

module.exports = router;
