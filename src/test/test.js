const test = require('tape');
const beautify = require('../index');

test('indentation', assert => {
  const actual = beautify('<div><span></span></div>');
  const expected =
`<div>
    <span>
    </span>
</div>`;

  assert.equal(actual, expected, 'should indent tags');
  assert.end();
});

test('custom indentation chars', assert => {
  const actual = beautify('<div><span></span></div>', '\t');
  const expected = '<div>\n\t<span>\n\t</span>\n</div>';

  assert.equal(actual, expected, 'should use characters specified in the second argument for indentation');
  assert.end();
});

test('self closing tags', assert => {
  const actual = beautify('<div><span><img src="" /></span></div>');
  const expected =
`<div>
    <span>
        <img src="" />
    </span>
</div>`;

  assert.equal(actual, expected, 'should indent self closing tags correctly');
  assert.end();
});

test('text nodes', assert => {
  const actual = beautify('<div><span>foo bar</span></div>');
  const expected =
`<div>
    <span>
        foo bar
    </span>
</div>`;

  assert.equal(actual, expected, 'should indent text nodes correctly');
  assert.end();
});

test('tags containing "/"', assert => {
  const actual = beautify('<div><a href="/">foo bar</a></div>');
  const expected =
`<div>
    <a href="/">
        foo bar
    </a>
</div>`;

  assert.equal(actual, expected, 'should indent tags containing "/" correctly');
  assert.end();
});

test('xml declaration', assert => {
  const actual = beautify('<?xml version="1.0"?><div><span></span></div>');
  const expected =
`<?xml version="1.0"?>
<div>
    <span>
    </span>
</div>`;

  assert.equal(actual, expected, 'should indent xml declaration correctly');
  assert.end();
})
