# segment-effect
Animate text paragraph like typing on the keyboard based on char or word

### Demo
![Demo animate-typing-text](https://media.giphy.com/media/3ohzdRTWLZK2rPoqoU/giphy.gif)

### Installing
Install and save to `package.json` from terminal:
```
$ npm install animate-typing-text --save
```
use with a bundler like webpack or browserify:
```js
var AnimateTypingText = require('animate-typing-text')
```
If you need a standalone <script>, though, a minified browser build that attaches to the global namespace as AnimateTypingText is provided [here](https://github.com/darwinchyd/animate-typing-text/blob/master/browser/dist/animate-typing-text.min.js):
```js
<script src="animate-typing-text.min.js"></script>
```
You can check it on the demo folder

### Usage
```js
var AnimateTypingText = require('animate-typing-text')

// With options default
new AnimateTypingText('.paragraph')

// With custom options default
new AnimateText('.paragraph', {
  time: 1000,
  letter: 'char' // Now there have two type (char & word)
  onAnimated: function () {console.log('done!')}
})
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
