var styleTest = document.createElement("div").style
  , cssSupportMap = {}
  , wordsRE = /\S+/g
  , prefixes = "webkit O ms Moz css".match(wordsRE)

module.exports = function(name){
  var index = -1
    , length = prefixes.length
    , property
  if(property = cssSupportMap[name]) return property
  if(typeof styleTest[name] == "string") {
    cssSupportMap[name] = name
    return name
  }
  name = name.charAt(0).toUpperCase() + name.slice(1)
  while(++index < length) {
    if(typeof styleTest[property = prefixes[index] + name] == "string") {
      cssSupportMap[name] = property
      return property
    }
  }
  return null
}
