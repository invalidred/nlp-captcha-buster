const tesseract = require("node-tesseract-ocr")
const sharp = require("sharp")
const fs = require('fs')
const request = require('request')

const config = {
  lang: "eng",
  oem: 3,
  psm: 11
}

const imageUrl = "https://irctclive.nlpcaptcha.in/index.php/media/getit/F62F_eHU4NWR3Uit4Y1lwWVl4cDk1NnErbnBmN01EQ2hrQjNhOXhmVmdiWTJaQTNsYWZDZUJ3ZkJ1ZExacjQzenBUU3E0SlhBV0tiWWJDU0J0Vkp2N3k0bmc9PQ=="

/*
tesseract
  .recognize(imageUrl, config)
  .then(text => `Result: ${text}`)
  .then(console.log)
  .catch(console.error)
 */

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download(imageUrl, 'input.png', cropImage)

function cropImage() {
  sharp('input.png')
    .extract({ left: 40, top: 250, width: 250, height: 20 })
    .toFile('output.png')
    .then(solveCaptcha)
    .catch(console.error)
}

function solveCaptcha() {
  tesseract
    .recognize('input.png', config)
    .then(text => `Result: ${text}`)
    .then(console.log)
    .catch(console.error)
}
