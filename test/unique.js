var tape = require("tape")
var unique = require("../lib/unique")

tape("unique", function(test){
  test.equal(
    typeof unique,
    "string"
  )
  test.end()
})
