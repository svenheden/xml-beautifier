# XML Beautifier

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]

This module "beautifies" XML documents by putting each tag and text node on their own line and
correctly indents everything.

Can be used e.g. if you're using [React as a static page generator][react] and (for some reason) need the
generated HTML to be more human-readable.


## Install

```
$ npm install --save xml-beautifier
```


## Usage

```js
import beautify from 'xml-beautifier';

const xml = beautify('<div><span>foo</span></div>');
console.log(xml); // => will output correctly indented elements
```


## License

MIT © [Jonathan Persson](https://github.com/jonathanp)

[npm-url]: https://npmjs.org/package/xml-beautifier
[npm-image]: https://badge.fury.io/js/xml-beautifier.svg
[travis-image]: https://travis-ci.org/jonathanp/xml-beautifier.svg
[travis-url]: https://travis-ci.org/jonathanp/xml-beautifier
[react]: https://facebook.github.io/react/docs/top-level-api.html#reactdomserver.rendertostaticmarkup
