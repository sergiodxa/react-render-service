const test = require('tape');
const cheerio = require('cheerio');
const superagent = require('superagent-as-promised')(require('superagent'));

test('Render service', t => {
  t.plan(1);

  const expectedResult = 'Hello world!';

  superagent
    .post('http://localhost:3000/')
    .send({
      component: './test/HelloWorld.js',
    })
    .then(response => {
      process.stdout.write('Rendered HTML: ' + response.text + '\n');

      t.equal(
        cheerio.load(response.text)('h1').text(),
        expectedResult
      );
    })
    .catch(error => t.fail('The test failed'));
});
