
const tryCatch = (errorHandler, f) => (x) => {
  try {
    f(x);
  } catch (error) {
    errorHandler(error);
  }
};

const compose = (f, g) => x => f(g(x));

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
    return new Future((reject, resolve) =>
      this.fork(
        reject,
        f => fx.fork(
          reject,
          tryCatch(reject, x => resolve(f(x))))));
  }

  fork(reject, resolve) {
    this.__f(reject, resolve);
  }
}

Future.of = x => new Future((reject, resolve) => resolve(x));
