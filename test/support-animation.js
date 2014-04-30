var tape = require("tape")
var keyframes = require("../lib/support-keyframes")

tape("keyframes", function(test){
  test.ok(
    typeof keyframes == "string" ||
    keyframes === null
  )
  test.end()
})
