
const tryCatch = (errorHandler, f) => (x) => {
  try {
    f(x);
  } catch (error) {
    errorHandler(error);
  }
};

const compose = (f, g) => x => f(g(x));

const runOnce = (f) => {
  let hasRun = false;
  return (...args) => {  // eslint-disable-line consistent-return
    if (!hasRun) {
      hasRun = true;
      return f(...args);
    }
  };
};

export default class Future {

  constructor(f) {
    this.__f = f;
  }

  map(f) {
    return this.chain(compose(Future.of, f));
  }

  chain(f) {
    return new Future((reject, resolve) =>
      this.fork(
        reject,
        tryCatch(reject, x => f(x).fork(reject, resolve))));
  }

  ap(fx) {
    return new Future((reject, resolve) => {
      let isRejected = false;
      let fnReady = false;
      let valueReady = false;
      let fn;
      let value;

      const rejectOnce = runOnce((error) => {
        isRejected = true;
        reject(error);
      });

      const tryRun = () => {
        if (fnReady && valueReady) {
          resolve(fn(value));
        }
      };

      const resolveFn = (f) => {
        if (isRejected) return;
        fnReady = true;
        fn = f;
        tryRun();
      };

      const resolveVal = (v) => {
        if (isRejected) return;
        valueReady = true;
        value = v;
        tryRun();
      };

      this.fork(rejectOnce, tryCatch(rejectOnce, resolveFn));
      fx.fork(rejectOnce, tryCatch(rejectOnce, resolveVal));
    });
  }

  fork(reject, resolve) {
    this.__f(reject, resolve);
  }
}

Future.of = x => new Future((reject, resolve) => resolve(x));

Future.reject = error => new Future(reject => reject(error));
