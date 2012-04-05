// console.log writer v0.1 (c) Vasiliy Shevchuk 2012
var fs = require('fs');
var util = require('util');
var logFileName = "log.txt";

module.exports = function(){
    var str = '';
    var result = '';
    function str_cut(str){
        var a = str.indexOf('\033[');
        if (a>0) {
            var b = str.indexOf('m',a);
            var c = str.slice(a,b+1);
            str = str.replace(c,'');
            str_cut(str);
        } else{
            result = str;
        }
    }
    for (var i in arguments){        
        str += arguments[i];;  
    }
    str_cut(str);
    str = result;
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