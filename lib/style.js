var style = document.createElement("style")
var parent = document.head || document.getElementsByTagName("head")[0]

parent.appendChild(style)

var sheet = style.sheet

module.exports = {
  sheet : sheet,
  remove : function(){
    parent.removeChild(style)
  }
}
