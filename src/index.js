'use strict';

const repeat = require('repeat-string');

const splitOnTags = str => str.split(/(<\/?[^>]+>)/g).filter(line => line.trim() !== '');
const isTag = str => /<[^>!]+>/.test(str);
const isXMLDeclaration = str => /<\?[^?>]+\?>/.test(str);
const isClosingTag = str => /<\/+[^>]+>/.test(str);
const isSelfClosingTag = str => /<[^>]+\/>/.test(str);
const isOpeningTag = str => isTag(str) && !isClosingTag(str) && !isSelfClosingTag(str) && !isXMLDeclaration(str);

module.exports = (xml, indent) => {
  let depth = 0;
  indent = indent || '    ';

  return splitOnTags(xml).map(item => {
    if (isClosingTag(item)) {
      depth--;
    }

    const line = repeat(indent, depth) + item;

    if (isOpeningTag(item)) {
      depth++;
    }

    return line;
  }).join('\n');
};
