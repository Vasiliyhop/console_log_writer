# Console.log writer

Writes the console log file is the chosen.


## How to use

First attach `console.log.js` in your project folder.
Next, require `./console.log.js`:

```js
console.log = require('./console.log.js');
```

Next, specify the log file name(default:'log.txt'):

```js
console.log.setLogName('log_One.txt');  
```

Create log header:

```js
console.log.setLogHeader();  
```

Specify the log data string length(default:54):

```js
console.log.setStrLength(70);  
```


## License 


Copyright (c) 2012 Vasiliy Shevchuk &lt;vasiliyhop@gmail.com&gt;


