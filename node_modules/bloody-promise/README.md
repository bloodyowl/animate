# promise

[![browser support](https://ci.testling.com/bloodyowl/promise.png)](https://ci.testling.com/bloodyowl/promise)

## Install

```
$ npm install bloody-promise
```

## Require

```javascript
var promise = require("bloody-promise")
```

## API

### `promise.create([fn]) -> promise`

Creates a new promise and immediately executes `fn` (asynchronously) with the promise as first argument. 

### `promise.from([any]) -> promise`

Creates a new promise based on the given value, or promise. If the argument is a value, promise is fulfilled. 

### `promise.createRejected([any]) -> promise`

Creates a new rejected promise with `any` as reason.

### `promise.then([successCallback][, rejectCallback]) -> new promise`

Adds callbacks to `promise` and returns a new promise based on the return values of callbacks. 
If a promise is returned from the executed callback, `new promise` will be `fulfilled` or `rejected` when this promise is `fulfilled` or `rejected`. 

### `promise.fulfill([value])`

Fulfills a promise with `value`

### `promise.reject([reason])`

Rejects a promise with `reason`

### `promise.all(array) -> new promise`

Creates a promise resolved when all `array` promises are fulfilled. 
Promises in the array are converted through `promise.from`. 
