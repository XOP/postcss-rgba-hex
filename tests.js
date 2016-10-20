var postcss = require('postcss');
var rgbaToHex = require('./');
var test = require('tape');

/**
 * Default options
 */
test('rgba-hex default options', function(t) {

    postcss([ rgbaToHex ])
        .process('.test-rgba-tight { background: rgba(0,0,0,.8); }')
        .then(function(result) {
            t.equal(
                result.css,
                '.test-rgba-tight { background: #000000; }',
                'should convert rgba(C,C,C,A) to HEX without alpha'
            );
        });

    postcss([ rgbaToHex ])
        .process('.test-rgba-sparse { background: rgba(0, 0, 0, .8); }')
        .then(function(result) {
            t.equal(
                result.css,
                '.test-rgba-sparse { background: #000000; }',
                'should convert rgba(C, C, C, A) to HEX without alpha'
            );
        });

    postcss([ rgbaToHex ])
        .process('.test-rgba-tight-full { background: rgba(0,0,0,0.8); }')
        .then(function(result) {
            t.equal(
                result.css,
                '.test-rgba-tight-full { background: #000000; }',
                'should convert rgba(C,C,C,A) (A with leading zero) to HEX without alpha'
            );
        });

    postcss([ rgbaToHex ])
        .process('.test-rgba-sparse-full { background: rgba(0, 0, 0, 0.8); }')
        .then(function(result) {
            t.equal(
                result.css,
                '.test-rgba-sparse-full { background: #000000; }',
                'should convert rgba(C, C, C, A) (A with leading zero) to HEX without alpha'
            );
        });

    postcss([ rgbaToHex ])
        .process('.test-rgba-tight-alpha { background: rgba(0,0,0,1); }')
        .then(function(result) {
            t.equal(
                result.css,
                '.test-rgba-tight-alpha { background: #000000; }',
                'should convert rgba(C,C,C,A) (A equals 1) to HEX without alpha'
            );
        });

    postcss([ rgbaToHex ])
        .process('.test-rgba-sparse-alpha { background: rgba(0, 0, 0, 1); }')
        .then(function(result) {
            t.equal(
                result.css,
                '.test-rgba-sparse-alpha { background: #000000; }',
                'should convert rgba(C, C, C, A) (A equals 1) to HEX without alpha'
            );
        });

    postcss([ rgbaToHex ])
        .process('.test-rgb-tight { background: rgb(100,100,100); }')
        .then(function(result) {
            t.equal(
                result.css,
                '.test-rgb-tight { background: #646464; }',
                'should convert rgb(C,C,C) to HEX'
            );
        });

    postcss([ rgbaToHex ])
        .process('.test-rgb-sparse { background: rgb(100, 100, 100); }')
        .then(function(result) {
            t.equal(
                result.css,
                '.test-rgb-sparse { background: #646464; }',
                'should convert rgb(C, C, C) to HEX'
            );
        });

    t.end();
});

/**
 * rgbOnly
 */
test('rgba-hex rgbOnly:true', function(t) {

    postcss([ rgbaToHex({
        rgbOnly: true
    }) ])
        .process('.test-rgba { background: rgba(100, 100, 100, 1); }')
        .then(function(result) {
            t.equal(
                result.css,
                '.test-rgba { background: rgba(100, 100, 100, 1); }',
                'should not convert rgba'
            );
        });

    postcss([ rgbaToHex({
        rgbOnly: true
    }) ])
        .process('.test-rgb { background: rgb(100, 100, 100); }')
        .then(function(result) {
            t.equal(
                result.css,
                '.test-rgb { background: #646464; }',
                'should convert rgb(C, C, C) to HEX'
            );
        });

    t.end();
});

/**
 * rgbaOnly
 */
test('rgba-hex rgbaOnly:true', function(t) {

    postcss([ rgbaToHex({
        rgbaOnly: true
    }) ])
        .process('.test-rgba { background: rgba(0,0, 0, .8); }')
        .then(function(result) {
            t.equal(
                result.css,
                '.test-rgba { background: #000000; }',
                'should convert rgba(C,C, C, A) to HEX'
            );
        });

    postcss([ rgbaToHex({
        rgbaOnly: true
    }) ])
        .process('.test-rgb { background: rgb(100, 100,100); }')
        .then(function(result) {
            t.equal(
                result.css,
                '.test-rgb { background: rgb(100, 100,100); }',
                'should not convert rgb'
            );
        });

    t.end();
});

/**
 * Invalid options
 */
test('rgba-hex rgbaOnly:true rgbOnly:true', function(t) {

    t.comment('expected log: Invalid options');
    postcss([ rgbaToHex({
        rgbOnly: true,
        rgbaOnly: true
    }) ])
        .process('.test-rgba-pass { background: rgba(0,0, 0, .8); }')
        .then(function(result) {
            t.equal(
                result.css,
                '.test-rgba-pass { background: rgba(0,0, 0, .8); }',
                'should not convert any rgb/rgba values'
            );
        });

    t.comment('expected log: Invalid options');
    postcss([ rgbaToHex({
        rgbOnly: true,
        rgbaOnly: true
    }) ])
        .process('.test-rgb-pass { background: rgb(100,100, 100); }')
        .then(function(result) {
            t.equal(
                result.css,
                '.test-rgb-pass { background: rgb(100,100, 100); }',
                'should not convert any rgb/rgba values'
            );
        });

    t.end();
});

/**
 * Silent mode
 */
test('rgba-hex silent:true', function(t) {

    t.comment('expected empty log');
    postcss([ rgbaToHex({
        silent: true
    }) ])
        .process('.test-rgba-tight { background: rgba(0,0,0,.8); }')
        .then(function(result) {
            t.equal(
                result.css,
                '.test-rgba-tight { background: #000000; }',
                'should convert rgba(C,C,C,A) to HEX without alpha and output no log'
            );
        });

    t.end();
});
