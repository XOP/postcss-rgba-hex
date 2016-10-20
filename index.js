/**
 * Module RGB(a)-HEX
 * @type {"postcss"}
 */

//
// Module dependencies

var postcss = require('postcss');
var rgb2hex = require('rgb2hex');
var assign = require('object-assign'); // fixme: remove after postcss node 0.12 drop support

//
// RGB(a) regex
var rgbReg = /rgb\(\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*(,\s*\d?.?\d+)?\)/g;
var rgbaReg = /rgba\(\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*(,\s*\d?.?\d+)?\)/g;
var rgbRgbaReg = /rgba?\(\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*(,\s*\d?.?\d+)?\)/g;

/**
 * PostCSS plugin
 * @type {*}
 */
module.exports = postcss.plugin('postcss-rgba-hex', function(options) {

    var reg = rgbRgbaReg;
    var o = assign({}, options);

    if(o.rgbOnly && o.rgbaOnly) {
        console.error('Invalid options');
        return noop;
    }

    if(o.rgbOnly) {
        reg = rgbReg;
    }

    if(o.rgbaOnly) {
        reg = rgbaReg;
    }

    return function(style) {
        style.walkDecls(function(decl) {
            var val = decl.value;

            // early return
            if(!val) {
                return;
            }

            // stripping values
            var rgbValues = val.match(reg);

            // converting values
            if(rgbValues && rgbValues.length > 0) {
                var newVal = val;

                rgbValues.forEach(function(rgb) {
                    newVal = newVal.replace(rgb, rgbaToHex(rgb));

                    if (!o.silent) {
                        console.info('RGB(a) replaced: ' + rgb + ' -> ' + rgbaToHex(rgb));
                    }
                });
                decl.value = newVal;
            }
        });
    };
});

/**
 * RGBA(a) to hex transformer
 * @param rgbaString
 * @returns {string}
 */
function rgbaToHex(rgbaString) {
    var hexString = '';

    hexString = rgb2hex(rgbaString).hex;

    return hexString;
}

/**
 * function doing nothing
 * @returns {boolean}
 */
function noop() {
    return false;
}
