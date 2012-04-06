// console.log writer v0.2 (c) Vasiliy Shevchuk 2012
var fs = require('fs');
var util = require('util');
var logFileName = "log.txt";
var logStrLength = 54;
module.exports = function(){
    var str = '';
    for (var i in arguments){        
        str += arguments[i];;  
    }
    str = str.replace(/[\033[]+(\d+)m/g,'');
    var DateData = new Date().toString().split(/\s(.*)(\sGMT)/)[1]+ ' | ';
    if (str.length>logStrLength) {
        var reg = new RegExp(".{0,"+logStrLength+"}","g");
        str = str.match(reg).join('\n'+DateData);
    }
    str = DateData+ str+ '\n';
    
    fs.createWriteStream(logFileName, {
        flags: "a",
        encoding: "UTF-8",
        mode: 0666
    }).write(str);

    process.stdout.write(util.format.apply(this, arguments) + '\n'); 
}
module.exports.setLogName = function(name){
    logFileName = name;
}
module.exports.setStrLength = function(length){
    logStrLength = length;
}
module.exports.setLogHeader = function(){
    console.log('=-'+new Date()+'-=');
    console.log('=-             Log Created                -=');
    console.log('\n');
}