var extend = require("bloody-collections/lib/extend")
  , hasMethod = require("./lib/hasMethod")
  , create = require("./lib/create")
  , K = function(){}

module.exports = {
  extend : function(object){
    var subKlass = create(this)
    extend(subKlass, object)
    return subKlass
  },
  create : function(){
    var instance = create(this)
    if(hasMethod(instance, "constructor")) {
      instance.constructor.apply(instance, arguments)
    }
    return instance
  },
  destroy : function(){
    if(hasMethod(this, "destructor")) {
      this.destructor.apply(this, arguments)
    }
  },
  constructor : K,
  destructor : K
}
