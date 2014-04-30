## class

[![browser support](https://ci.testling.com/bloodyowl/class.png)](https://ci.testling.com/bloodyowl/class)

### Install 

```
$ npm install bloody-class
```

With [component(1)](http://component.io):

```
$ component install bloodyowl/class
```

### Require

```javascript
var klass = require("class")
```

### Definition 

Classes are objects that contain inherits for instances. 
You can extend and create instances of an existing class. 
Classes are based on prototypal inheritance, that way, you can easily update all subclasses and instances from one of their parent class. 

### Methods

#### `klass.extend([object])` -> `newClass`

Creates a new class that inherits from `klass`. Optionaly takes an `object` arguments that extends the `newClass` as owned properties. 

#### `klass.create([args …])` -> `newInstance`

Creates a new instance that inherits from `klass`. Its arguments are passed to `klass.constructor` which is called if `klass` owns a `constructor` method. 

#### `instance.destroy([args …])` 

Removes all the internal references to `instance`, as in `parent.instances` for instance. Its arguments are passed to `klass.destructor` which is called if `klass` owns a `destructor` method. 

### Usage

```javascript
// create a class
var myClass = klass.extend({
  // constructor is the method called when an instance is created
  constructor : function(args/* …*/){ 
    // this -> instance
    // args … -> arguments passed through the `.create` method
  }, 
  destructor : function(){
    // this -> instance
    // args … -> arguments passed through the `.destroy` method
  }
})

// myClass has a "_klass" property with a uniq integer
myClass._klass // -> integer

// create an instance
var myInstance = myClass.create()

// myInstance has a "_id" property with a uniq integer (relative to its parent class)
myInstance._id // -> integer

// instance is in myClass._instances and myInstance._instances
each(myClass._instances, console.log, console)
// > logs [myInstance, "0", myClass._instances]

// destroy an instance
myInstance.destroy()

// instance is now removed from myClass._instances
each(myClass._instances, console.log, console)
// > doesn't log anything

// and wipe it out
myInstance = null
```
