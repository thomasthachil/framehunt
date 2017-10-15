var express = require('express');
var router = express.Router();
var youtubedl = require('youtube-dl');
var FileReader = require('filereader');
var multer  = require('multer');
var fs = require('fs');
var ytdl = require('ytdl-core');

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


var counter = 0;

// Get byte stream for video
router.get('/bytes', function(req, res, next) {
    var filename =  "video" + counter + ".mp4";
    counter += 1;
    ytdl(req.query.url)
      .pipe(fs.createWriteStream("../public/" + filename)).on('finish', function() {
        res.setHeader('Content-Type', 'application/json');
        res.send(filename);
      });
});

// Get byte stream for video
router.post('/upload', upload.single('video'), function(req, res, next) {
  var video = req.file;
  res.send(fs.readFileSync(video.path, { encoding: 'base64' }));
});

module.exports = router;
