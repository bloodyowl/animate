var tape = require("tape")
var animate = require("../")
var keyframes = require("../lib/support-keyframes")

tape("animate", function(test){
  var keyframesCssText = "{to{opacity:0}}"
  var style = document.createElement("style")
  ;(document.head || document.getElementsByTagName("head")[0])
    .appendChild(style)
  if(keyframes) {
    style.sheet.insertRule(
      keyframes + " foo " + keyframesCssText,
      style.sheet.cssRules.length
    )
  }
  var element = document.createElement("div")
  document.body.appendChild(element)

  animate(element, "foo 1s ease-in .5s")
    .then(function(date){
      test.equal(typeof date, "number")
      test.notOk(element.style.animation)
      test.notOk(element.style.webkitAnimation)
      test.notOk(element.style.mozAnimation)
      test.notOk(element.style.oAnimation)
      test.notOk(element.style.msAnimation)
    })
    .then(function(){
      animate(element, "this will not work")
        .then(function(date){
          test.equal(typeof date, "number")
          test.notOk(element.style.animation)
          test.notOk(element.style.webkitAnimation)
          test.notOk(element.style.mozAnimation)
          test.notOk(element.style.oAnimation)
          test.notOk(element.style.msAnimation)
          test.end()
        })
    })


})
