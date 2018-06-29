# simplejsonconf

> A simple library to manage JSON as ex. a configuration file

- Expects pure JSON. Any functions etc, will be lost!
- Copies JSON, so the data is not mutable from the outside
- Written in ES6 (no ES5 bundle included at the moment)

## Examples

```javascript
const simplejsonconf = require('simplejsonconf')

// Create a new instance with an initial tree
const jsonconf = simplejsonconf({
  foo: 'bar',
  sounds: {
    enabled: true
  },
  ui: {
    show: ['sidebar', 'footer'],
    colors: {
      red: '#ff0000',
      green: '#00ff00',
      blue: '#0000ff'
    }
  }
})

//
// Gets a value
//

jsonconf.get('sounds.enabled') // => true

jsonconf.get('ui') // => {show: ...}

//
// Sets a value
//

jsonconf.set('sounds.enabled', false)

jsonconf.set('ui.show.0', 'new-sidebar') // Also works on arrays

jsonconf.push('ui.show', 'ads') // Push to arrays

jsonconf.set('ui.colors', {
  white: '#ffffff'
}, {
  merge: true // Objects will merge by default
})

jsonconf.set('ui.colors', '{"black":"#000000"}', {
  parse: true // Input will be parsed by default
})


//
// Removes an entry or value (depending on target)
//

json.remove('foo')

json.remove('ui.show.0') // Also works on arrays

//
// Misc
//

jsonconf.reset() // Reset to original values

jsonconf.reset({foo: 'bar'}) // Reset to new tree

jsonconf.toString() // As a JSON encoded string
```

## License

```text
BSD 2-Clause License

Copyright (c) 2011-2018, Anders Evenrud <andersevenrud@gmail.com>
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met: 

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer. 
2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
```

## Changelog

### 2.0.4

Added missing 'no key' setter support

### 2.0.3

Some minor improvements.

### 2.0.2

Bugfixes and unit tests.

### 2.0.1

Rewritten with nicer api and cleaner code overall.

**Not backward compatible**

### 1.0.x

Original release.
