var promise = require("bloody-promise")
var animation = require("./lib/support-animation")
var keyframes = require("./lib/support-keyframes")
var eventSupport = require("./lib/support-event")

module.exports = function(element, cssText){
  return (
    eventSupport
      .then(
        hasAnimation(element, cssText),
        noAnimation
      )
  )
}

function hasAnimation(element, cssText){
  return function(eventName){
    var animationPromise = promise.create()
    element.addEventListener(eventName, fulfill, false)
    function fulfill(){
      if(typeof cssText == "string") {
        element.style[animation] = ""
      }
      animationPromise.fulfill(+new Date())
      element.removeEventListener(eventName, fulfill, false)
    }
    if(typeof cssText == "string") {
      element.style[animation] = ""
      element.style[animation] = cssText
      if(!element.style[animation]) {
        animationPromise.fulfill(+new Date())
      }
    }
    return animationPromise
  }
}

function noAnimation(){
  return +new Date()
}
