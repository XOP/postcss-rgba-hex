var postcss = require('postcss');
var rgb2hex = require('rgb2hex');

module.exports = function(opts) {
    var inputString = 'rgba(255,255,255,.5)';
    var outputHex = rgb2hex(inputString).hex;

    return outputHex;
};

//module.exports = postcss.plugin('postcss-rgba-hex', function(opts) {
//    // ...
//});