const express = require('express')
const app = express()
const fs = require('fs');


/* Routes */
app.get('/', function (req, res) {
    var filename = req.query.file;
    res.send(fs.readFileSync(filename, { encoding: 'base64' }));
})




/* Server port */
app.listen(5000, function () {
  console.log('Example app listening on port 5000!')
})
