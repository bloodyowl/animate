var promise = require("bloody-promise")
var animation = require("./support-animation")
var keyframes = require("./support-keyframes")
var style = require("./style")
var unique = require("./unique")

var element = document.createElement("i")

var eventTypes = [
  "animationend",
  "webkitAnimationEnd",
  "oAnimationEnd",
  "oanimationend",
  "MSAnimationEnd"
]

var index = -1
var length = eventTypes.length
var resultPromise = promise.create()

if(
  !element.addEventListener ||
  !animation || !keyframes
) {

  resultPromise.reject()

} else {

  element.style.visibility = "hidden"
  element.style.position = "absolute"
  element.style.height = "0"
  element.style.width = "0"

  function fulfill(eventObject){
    resultPromise.resolve(eventObject.type)
    element.removeEventListener(eventObject.type, fulfill, false)
  }

  while(++index < length) {
    element.addEventListener(eventTypes[index], fulfill, false)
  }

  document.body.insertBefore(element, document.body.firstChild)
  element.style[animation] = unique + " 0.001s linear"

  resultPromise.then(function(value){
    document.body.removeChild(element)
    style.remove()
  })

}

module.exports = resultPromise
