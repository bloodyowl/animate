var tape = require("tape")
var supportedEvent = require("../lib/support-event")

tape("support-event", function(test){
  supportedEvent.then(
    function(value){
      test.equal(typeof value, "string")
      test.end()
    },
    function(reason){
      test.equal(typeof reason, "undefined")
      test.end()
    }
  )
})
