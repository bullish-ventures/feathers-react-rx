import _debug from 'debug';

const debug = _debug('feathers-react-rx:appstate');

export default function(RxJS) {
  if(!RxJS || !RxJS.BehaviorSubject) {
    throw new Error('Need an instance of RxJS with a `BehaviorSubject`');
  }

  return function() {
    const app = this;

    app.state = function(props) {
      Object.keys(props).forEach(key => {
        const value = props[key];
        const subject = new RxJS.BehaviorSubject(value);

        subject.then = function(... args) {
          return this.take(1).toPromise().then(... args);
        };

        debug('Defining app.state property', key, value);

        Object.defineProperty(app.state, key, {
          enumerable: true,

          get() {
            return subject;
          },

          set(value) {
            subject.next(value);

            return subject;
          }
        });
      });
    };
  };
}
