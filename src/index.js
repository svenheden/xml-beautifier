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
  let ignoreMode = false;
  let deferred = [];
  let cdataBlock = "";

  return splitOnTags(xml).map(item => {
    if (item.trim().startsWith("<![CDATA[")) {
      ignoreMode = true;
    }
    if (item.trim().endsWith("]]>")) {
      ignoreMode = false;
      deferred.push(item);
      cdataBlock = deferred.join("");
      deferred = []
      return cdataBlock;
    }
    if (ignoreMode) {
      deferred.push(item);
      return null;
    }

    // removes any pre-existing whitespace chars at the end or beginning of the item
    item = item.replace(/^\s+|\s+$/g, '');
    if (isClosingTag(item)) {
      depth--;
    }

    const line = repeat(indent, depth) + item;

    if (isOpeningTag(item)) {
      depth++;
    }

    return line;
  }).filter(c => c).join('\n');
};
