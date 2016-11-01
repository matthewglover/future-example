
export default class Future {

  constructor(f) {
    this.__f = f;
  }

  fork(reject, resolve) {
    this.__f(reject, resolve);
  }
}
