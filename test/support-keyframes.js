var tape = require("tape")
var animation = require("../lib/support-animation")

tape("support-animation", function(test){
  test.ok(
    typeof animation == "string" ||
    animation === null
  )
  test.end()
})
