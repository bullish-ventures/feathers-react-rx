import _debug from 'debug';

const debug = _debug('feathers-react-rx:component');

export default function(RxJS, React) {
  if(!RxJS || !RxJS.BehaviorSubject) {
    throw new Error('Need an instance of RxJS with a `BehaviorSubject`');
  }

  if(!React || !React.Component) {
    throw new Error('Need an instance of React with a React.Component ES6 class available.');
  }

  return class Component extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this._subscriptions = {};

      const oldComponentWillMount = this.componentWillMount;
      const oldComponentWillUnmount = this.componentWillUnmount;

      this.componentWillMount = function(... args) {
        Object.keys(this.props).forEach(key => {
          const value = this.props[key];

          if(typeof value === 'object' && value instanceof RxJS.Observable) {
            this.subscribe(key, value);
          }
        });

        if(typeof oldComponentWillMount === 'function') {
          return oldComponentWillMount.apply(this, args);
        }
      };

      this.componentWillUnmount = function(... args) {
        Object.keys(this._subscriptions).forEach(key => this.unsubscribe(key));

        if(typeof oldComponentWillUnmount === 'function') {
          return oldComponentWillUnmount.apply(this, args);
        }
      };
    }

    subscribe(key, value) {
      debug('Subscribing to observable', key);
      this._subscriptions[key] = value.subscribe(data => {
        debug('Setting', key, data);
        this.setState({ [key]: data });
      });
    }

    unsubscribe(key) {
      if(this._subscriptions[key]) {
        debug('Unsubscribing', key);
        this._subscriptions[key].unsubscribe();
        delete this._subscriptions[key];
      }
    }
  };
}
