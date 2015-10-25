var fs = require('fs');

var rgbaToHex = require('./index.js');
var postcss = require('postcss');

var css = fs.readFileSync('./tests/test.css');

// default
postcss([ rgbaToHex ])
    .process(css)
    .then(function(result) {
        console.log('Result CSS (Default): \n' + result.css + '\n\n');
    });

// rgbOnly
postcss([ rgbaToHex({rgbOnly: true}) ])
    .process(css)
    .then(function(result) {
        console.log('Result CSS (rgb only): \n' + result.css + '\n\n');
    });

// rgbaOnly
postcss([ rgbaToHex({rgbaOnly: true}) ])
    .process(css)
    .then(function(result) {
        console.log('Result CSS (rgba only): \n' + result.css + '\n\n');
    });

// rgbOnly && rgbaOnly
postcss([ rgbaToHex({rgbaOnly: true, rgbOnly: true}) ])
    .process(css)
    .then(function(result) {
        console.log('Result CSS (unmodified): \n' + result.css + '\n\n');
    });
