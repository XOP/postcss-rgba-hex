var fs = require('fs');

var rgbaToHex = require('./index.js');
var postcss = require('postcss');

var css = fs.readFileSync('./tests/test.css');

postcss([ rgbaToHex ])
    .process(css)
    .then(function(result) {
        console.log('Result CSS: ' + result.css);
    });
