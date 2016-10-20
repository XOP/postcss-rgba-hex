# postcss-rgba-hex

[![npm version](https://badge.fury.io/js/postcss-rgba-hex.svg)](https://www.npmjs.com/package/postcss-rgba-hex) [![build status](https://travis-ci.org/XOP/postcss-rgba-hex.svg)](https://travis-ci.org/XOP/postcss-rgba-hex)

> [PostCSS](https://github.com/postcss/postcss) plugin that replaces RGB(a) values with hexadecimal analogues


## Processing example

this code

```
.element {
    border: 2px solid rgba(0,0,0,.2);
}
```

converts to

```
.element {
    border: 2px solid #000000;
}
```


## Installation

```
npm i --save-dev postcss-rgba-hex
```


## Usage

```
postcss([ require('postcss-rgba-hex') ])
```
Please refer to [PostCSS documentation](https://github.com/postcss/postcss#usage) for you current environment.


### Options

#### `rgbOnly` [Boolean]
default: `false`

Process only rgb color values

#### `rgbaOnly` [Boolean]
default: `false`

Process only rgba color values

#### `silent` [Boolean]
default: `false`

Omit verbose conversion logging


## [Changelog](CHANGELOG)


## [License](LICENSE)
