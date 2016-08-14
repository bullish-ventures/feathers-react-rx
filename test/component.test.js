import assert from 'assert';
import RxJS from 'RxJS';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import component from '../src/component';

describe('React component tests', () => {
  it('subscribes to an observable', function() {
    const Component = component(RxJS, React);
    const observer = new RxJS.BehaviorSubject(42);

    class MyComponent extends Component {
      render() {
        return <span>{this.state.number}</span>
      }
    }

    let rendered = ReactDOMServer.renderToString(<MyComponent number={observer} />);

    assert.ok(/42/.test(rendered));
  });
});
