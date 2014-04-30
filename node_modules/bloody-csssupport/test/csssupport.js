var tape = require("tape")
  , cssSupport = require("../")
  , transitionMap = {
      "webkitTransition" : 1,
      "mozTransition" : 1,
      "oTransition" : 1,
      "OTransition" : 1,
      "msTransition" : 1,
      "transition" : 1
    }

tape("cssSupport", function(test){
  
  test.equal(cssSupport("position"), "position", "returns string")
  test.equal(cssSupport("fontSize"), "fontSize", "returns string")
  var transitionProperty = cssSupport("transition")
  test.ok(transitionProperty in transitionMap || transitionProperty == null, "returns prefixed or null")
  test.equal(cssSupport("fooBarBaz"), null, "not supported returns null")
  test.end()
  
})
