import test from 'ava';
import Future from '../future';

const identity = x => x;

const resolvingAsync = (v, delay = 1) => ((reject, resolve) => {
  setTimeout(() => resolve(v), delay);
});

const rejectingAsync = (e, delay = 1) => ((reject) => {
  setTimeout(() => reject(e), delay);
});

const testError = new Error('Test error');


test('new Future returns instance of future', (t) => {
  const f = new Future();
  t.true(f instanceof Future);
});

test.cb('Future::fork - executes future, receiving resolved value to onResolve handler', (t) => {
  const f = new Future(resolvingAsync(10));

  f.fork(identity, (value) => {
    t.is(value, 10);
    t.end();
  });
});

test.cb('Future::fork - executes future, receiving rejected value to onReject handler', (t) => {
  const f = new Future(rejectingAsync(testError));

  f.fork((error) => {
    t.is(error, testError);
    t.end();
  });
});
