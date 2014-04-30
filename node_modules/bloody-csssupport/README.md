# cssSupport

[![browser support](https://ci.testling.com/bloodyowl/csssupport.png)](https://ci.testling.com/bloodyowl/csssupport)

## Install

```
$ npm install bloody-csssupport
```

## Require

```javascript
var cssSupport = require("bloody-csssupport")
```

## API

### cssSupport(property) -> string||null`

Checks if `property` (mush be camelCased)  is available. Returns the (optionaly prefixed) property or null. 

## Usage

```javascript
var transitionProperty = cssSupport("transition")
transitionProperty // -> "webkitTransition"
```
