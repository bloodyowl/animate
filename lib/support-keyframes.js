var style = require("./style")
var unique = require("./unique")

var keyframesProperties = [
  "@-webkit-keyframes",
  "@-moz-keyframes",
  "@-o-keyframes",
  "@keyframes"
]
var keyframes = "{to{opacity:0;}}"
var index = -1
var length = keyframesProperties.length

;(function(){
  while(++index < length) {
    try {
      style.sheet.insertRule(
        keyframesProperties[index] + " " + unique + keyframes,
        style.sheet.cssRules.length
      )
      module.exports = keyframesProperties[index]
      return
    } catch(e) {
      module.exports = null
    }
  }
})()
