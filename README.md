# animate

[![browser support](https://ci.testling.com/bloodyowl/animate.png))](https://ci.testling.com/bloodyowl/animate)

## install

```sh
$ npm install bloody-animate
```

## require

```javascript
var animate = require("bloody-animate")
```

## api

### `animate(element, animation) > promise`

animates `element` using the given `animation` cssText. (autoprefix)

#### options

- `element` : element to animate
- `animation` : css string (e.g `keyFrameName .3s ease-in-out`)

## example

```javascript
var animate = require("bloody-animate")

animate(document.body, "appear .5s linear")
  .then(function(date){
    console.log("animationEnd", date)
    document.body.classList.add("Body--initialised")
  })
```
