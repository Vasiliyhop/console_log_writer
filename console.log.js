// console.log writer v0.1 (c) Vasiliy Shevchuk 2012
var fs = require('fs');
var util = require('util');
var logFileName = "log.txt";
var replaceArr = ['\033[33m','\033[36m','\033[39m','\033[90m','\033[33m','\033[36m','\033[39m','\033[90m'];

module.exports = function(){
    var str = '';
    var obj = {};
    for (var i in arguments){
        obj[i] = arguments[i];
        for (var j = 0;j<replaceArr.length;j++){
            obj[i] = obj[i].replace(replaceArr[j],'');
        }
        str += obj[i];  
    }
    var curentDate = new Date();
    var DateData = (curentDate.getMonth()+1)+'.'+curentDate.getDate()+'.'+curentDate.getFullYear()+' ' + curentDate.getHours()+':'+curentDate.getMinutes()+':'+curentDate.getSeconds()+' | ';
    str = DateData+str+"\n";
    
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
module.exports.setLogHeader = function(){
    console.log('=-'+new Date()+'-=');
    console.log('=-             Log Created                -=');
    console.log('\n');
}