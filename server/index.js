var express = require('express');
var router = express.Router();
var youtubedl = require('youtube-dl');
var FileReader = require('filereader');

/* GET home page. */
router.get('/bytes', function(req, res, next) {
    var video = youtubedl(req.query.url,
    // Optional arguments passed to youtube-dl.
    ['--format=18'],
    // Additional options can be given for calling `child_process.execFile()`.
    { cwd: __dirname });

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
