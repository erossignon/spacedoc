const { expect } = require('chai');
const { Spacedoc } = require('..');

const TEST_FILE = require('./fixtures/test_file');

describe('Spacedoc.build()', () => {
  it('builds an HTML file from the data of a page', () => {
    const s = new Spacedoc();
    s.config({
      template: 'test/fixtures/template-simple.pug'
    });

    const output = s.build({ kitty: 'kitty' });
    expect(output).to.be.a('string');
    expect(output).to.contain('kitty');
  });

  it('adds global data to the template context', () => {
    const s = new Spacedoc();
    s.config({
      template: 'test/fixtures/template-simple.pug',
      data: { kitty: 'kitty' }
    });

    const output = s.build();
    expect(output).to.contain('kitty');
  });

  it('catches template errors', () => {
    const s = new Spacedoc();
    s.config({
      template: 'test/fixtures/template-broken.pug'
    });

    expect(() => {
      s.build()
    }).to.throw(Error);
  });

  it('allows Front Matter to be retained on the page', function(done) {
    const s = new Spacedoc();
    s.config({
      template: 'test/fixtures/template.pug',
      keepFm: true
    });

    s.parse(TEST_FILE).then(data => {
      const output = s.build(data);
      expect(output).to.contain('---');
      done();
    }).catch(done);
  });
});
