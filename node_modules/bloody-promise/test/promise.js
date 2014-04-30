var tape = require("tape")
  , promise = require("../")

tape("promise", function(test){

  test.plan(17)

  var z = ""
    , p = promise.create(function(r){
        test.equal(z, "1", "Function is executed immediately")
        test.equal(p, r, "promise is passed to function")
        r.fulfill(1)
      })
      
    p.then(function(value){
      var p2 = promise.create()
      test.equal(value, 1, "value is passed")
      setTimeout(function(){
        p2.fulfill(2)
      }, 400)
      return p2
    })
    .then(function(value){
      var p3 = promise.create()
      test.equal(value, 2, "promise passed")
      p3.reject("foo")
      return p3
    })
    .then(function(){
      test.fail("shouldn't execute successCallback")
    }, function(reason){
      test.equal(reason, "foo", "executes rejectCallback")
    })
    
    p.then(function(){
      var p4 = promise.create()
      setTimeout(function(){
        p4.reject(1)
      })
      return p4
    })
    .then(function(){
      test.fail("shouldn't execute successCallback")
    }, function(reason){
      test.equal(reason, 1, "executes rejectCallback")
    })
    
    p.then(function(value){
      test.equal(value, 1, "multiple callbacks can be pushed")
      p.reject()
      test.ok(p.status & p.FULFILLED, "status doesn't change after forced to it")
      return 1
    })
    .then(function(value){
      test.equal(value, 1, "passes non promise values")
    })
    .then(function(){
      throw "foo"
    })
    .then(function(value){
      test.fail("shouldn't execute successCallback on error")
    }, function(reason){
      test.equal(reason, "foo", "should execute rejectCallback on error")
    })
  
    p.then(function(){
      throw "foo"
    })
    .then(function(){
      test.fail("shouldn't execute successCallback on error")
    }, function(){
      return 1
    })
    .then(function(value){
      test.equal(value, 1, "should execute successCallback")
    }, function(reason){
      test.fail("shouldn't execute rejectCallback")
    })
    
    var e = promise.from(p)
    
    test.notEqual(p, e, "promise.from from promise returns new promise")

    e.then(function(value){
      test.equal(value, 1, "promise.from from promise gets value")
    })
    
    var r = promise.from(1)
    
      r.then(function(value){
        test.equal(value, 1, "promise.from from any value has value")
        test.ok(r.status & r.FULFILLED, "promise.from value is fulfilled")
      })
      
    var t = promise.createRejected(2)
      
      t.then(function(){
        test.fail("promise.createRejected shouldn't run successCallback")
      }, function(reason){
        test.ok(t.status & t.REJECTED, "promise.createRejected is rejected")
        test.equal(reason, 2, "promise.createRejected gets value as reason")
      })

  z += "1"

})


tape("promise.all", function(test){
  
  test.plan(4)
  
  var p = promise.create()
    , r = promise.create()
    , q = promise.create()
    , all = promise.all([1, p, r])
    , allReject = promise.all([q])
  
  p.fulfill(2)
  
  setTimeout(function(){
    r.fulfill(3)
  }, 300)
  
  q.reject("nah")
  
  all.then(function(array){
    test.equal(array[0], 1, "converts values to promises")
    test.equal(array[1], 2, "binds to promises")
    test.equal(array[2], 3, "binds to promises")
  }, function(){
    test.fail("shouldn't run rejectCallback")
  })
  
  allReject.then(function(){
    test.fail("shouldn't run successCallback")
  },function(reason){
    test.equal(reason, "nah", "runs rejectCallback")
  })
  
  
})
