
export default class Future {

  constructor(f) {
    this.__f = f;
  }

  map(f) {
    return new Future((reject, resolve) =>
      this.fork(reject, x => resolve(f(x))));
  }

  fork(reject, resolve) {
    this.__f(reject, resolve);
  }
}
