module.exports = function(object, property){
  return typeof object[property] == "function"
}