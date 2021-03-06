# Building a future implementation


## What

An implementation of Future

## How

Using ES6 and TDD

## Why

To learn about Futures and how they work.

## Requirements

1. Future.prototype.fork - should run Future, accepting a reject and resolve handler

2. Future.prototype.map - for `Future a`, should accept a function `a -> b` and return a `Future b`

3. Future.prototype.chain - for `Future a`, should accept a function `a -> Future b` and return a `Future b`

4. Future.prototype.ap - for `Future (a -> b)`, should accept a `Future a` and return a `Future b`

5. Future.of - takes a value `a` and returns a resolving `Future a`

6. Synchronous errors - add handling of synchronous errors in map and chain and ap

7. Refactor map to chain - declare map in terms of chain

8. Future.reject - takes an error `e` and returns a rejecting `Future e`

9. Refactor code

10. Future.prototype.ap - for `(Future (a -> b -> [a, b])).ap(Future e a).ap(Future e b) -> Future e [a, b]`, where `Future e b` resolves after `Future e a` and `Future e a` and `Future e b` are executed in parallel.
