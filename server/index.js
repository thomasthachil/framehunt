var express = require('express');
var router = express.Router();
var youtubedl = require('youtube-dl');
var FileReader = require('filereader');

/* GET home page. */
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

  // // res.render('index', { title: 'Express' });
  // var filename = req.query.file;
  // console.log(filename);
  // console.log("received");
  // res.send(fs.readFileSync(filename, { encoding: 'base64' }));
});

module.exports = router;
