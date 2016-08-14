# feathers-react-rx

[![Build Status](https://travis-ci.org/bullish-ventures/feathers-react-rx.png?branch=master)](https://travis-ci.org/bullish-ventures/feathers-react-rx)

> Utility components and plugins for using Feathers with RxJS and React

## About

A collection of utilities and a base React component to make working with Feathers and RxJS easier. Plays nicely with [feathers-reactive](https://github.com/feathersjs/feathers-reactive). It currently contains:

### app.state

A Feathers plugin that lets you define an application state with each property being turned into an observable. Properties can be set via normal assignment:

```js
const feathers = require('feathers');
const RxJS = require('rxjs');
const { state } = require('feathers-react-rx');

const app = feathers().configure(state(RxJS));

app.state({ hello: 'world' });

app.state.subscribe(value => console.log(`Got: '${value}'`));
// -> Got: 'world'

app.state.hello = 'Other message';
// -> Got: 'Other message'

// Use as a promise
app.state.hello.then(value => console.log(`Promise value is '${value}'`));

// -> Promise value is 'Other mesage'
```

### RxJS component

A React component that subscribes to RxJS observables that were passed as properties.

```js
const RxJS = require('rxjs');
const React = require('react');
const ReactDom = require('react-dom');

const { component } = require('feathers-react-rx');
const Component = component(RxJS, React);

// A timer that increases every 500ms
const obsevable = RxJS.Observable.timer(500, 500).map(i => i + 1);

class MyComponent extends Component {
  render() {
    return <span>{this.state.timer}</span>
  }
}

ReactDOM.render(<MyComponent timer={observable} />, el);
```

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
