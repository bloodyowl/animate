var klass = require("bloody-class")
  , immediate = require("bloody-immediate")

function K(){}

module.exports = klass.extend({
  constructor : function(promise){
    this.promise = promise
    this.callbacks = {}
  },
  _call : function(callback, state, boundPromise, thisValue){
    var returnedValue
    try {
      returnedValue = callback(thisValue[state])
    } catch(reason) {
      boundPromise.reject(reason)
      return
    }
    if(returnedValue && returnedValue._isPromise && returnedValue.then) {
      returnedValue.then(function(value){
        boundPromise.fulfill(value)
      }, function(reason){
        boundPromise.reject(reason)
      })
      return
    }
    boundPromise.fulfill(returnedValue)
  },
  push : function(callback, state, boundPromise){
    ;(this.callbacks[state] = this.callbacks[state] || [])
      .push({
          callback : typeof callback == "function" ? callback : K
        , boundPromise : boundPromise
      })
    if(this.promise.status & state) this.update()
  },
  update : function(){
    var object
      , state = this.promise.status
    if(!this.callbacks[state]) return
    while(object = this.callbacks[state].shift()) {
      immediate.call(this._call, object.callback, state, object.boundPromise, this.promise)
    }
  }
})
