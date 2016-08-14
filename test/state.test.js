import assert from 'assert';
import feathers from 'feathers';
import RxJS from 'rxjs';
import state from '../src/state';

describe('app state tests', () => {
  before(function() {
    this.app = feathers().configure(state(RxJS));

    this.app.state({
      test: false,
      hello: 'world'
    });
  });

  it('defines state properties as obsevables', function(done) {
    const state = this.app.state;

    assert.ok(state.test instanceof RxJS.Observable);
    assert.ok(state.hello instanceof RxJS.Observable);

    state.hello.subscribe(value => {
      assert.equal(value, 'world');
      done();
    }, done);
  });

  it('converts state properties into a promise', function() {
    return this.app.state.hello
      .then(value => assert.equal(value, 'world'));
  });

  it('sets properties and emits new value', function(done) {
    const state = this.app.state;

    state.test.take(1).subscribe(value =>  assert.equal(value, false), done);
    state.test.skip(1).take(1).subscribe(value => assert.ok(value), done);
    state.test.skip(2).take(1).subscribe(value => {
      assert.equal(value, 'othervalue');
      done();
    },done);

    state.test = true;
    state.test = 'othervalue';
  });
});
