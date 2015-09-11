var expect = require('chai').expect;
var ui = require('../helpful-ui.js');

describe('plugin', function () {

  it('loads without failure', function () {
    expect(ui).to.be.a('function');
  });

});
