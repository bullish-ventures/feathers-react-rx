import assert from 'assert';

describe('feathers-react-rx', () => {
  it('is CommonJS compatible', () => {
    const lib = require('../lib');

    assert.equal(typeof lib.component, 'function');
    assert.equal(typeof lib.state, 'function');
  });
});
