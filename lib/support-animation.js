var properties = [
  "animation",
  "webkitAnimation",
  "mozAnimation",
  "oAnimation",
  "msAnimation"
]
var index = -1
var length = properties.length
var element = document.createElement("div")
var style = element.style

;(function(){
  while(++index < length) {
    if(typeof style[properties[index]] == "string") {
      module.exports = properties[index]
      return
    }
  }
  module.exports = null
})()
