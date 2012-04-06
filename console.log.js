// console.log writer v0.2 (c) Vasiliy Shevchuk 2012
var fs = require('fs');
var util = require('util');
//.................defaults
var logFileName = "log.txt";
var logStrLength = 54;
//..................object to string function ==>
function objConvert(obj,len) {
    if (obj == null) obj = 'null';
    if (len == null) len = 1;
    var str = '';
    if (typeof(obj) == "object") {
        str += typeof(obj) + " {\n";
        for (var j in obj) {
            for (var i=0; i<len; i++) str += "  ";
            str += j+": " + objConvert(obj[j],len+1);
        }
        for (var i=0; i<len-1; i++) str += "  ";
        str += "}\n"
    } else {
        str += "" + obj + "\n";
    }
    return str;
}
//......................console.log modules
module.exports = function(){
    var str = '';
    var DateData = new Date().toString().split(/\s(.*)(\sGMT)/)[1]+ ' | ';
    for (var i in arguments){      // arguments object to string
        if (typeof arguments[i] != 'object') {
            str += arguments[i];
        }else{
            str += objConvert(arguments[i],1);
        }  
    }
    str = str.replace(/[\033[]+(\d+)m/g,'');    // remove colors
    var arr = str.split(/\n/g);
    var reg = new RegExp(".{0,"+logStrLength+"}","g");  // string length reg
    for (var i = 0 ;i<arr.length;i++){
        if (arr[i].length>logStrLength) {
            arr[i] = DateData+ arr[i].match(reg).join('\n'+DateData)+ '\n';  // if string length>logStrLength ==> \n
        } else {
            arr[i] = DateData+ arr[i]+ '\n';
        }
    }
    str = arr.join('');
    
    fs.createWriteStream(logFileName, {      // write data in file
        flags: "a",
        encoding: "UTF-8",
        mode: 0666
    }).write(str);

    process.stdout.write(util.format.apply(this, arguments) + '\n'); // nodejs console.log
}
module.exports.setLogName = function(name){
    logFileName = name;     // log file name
}
module.exports.setStrLength = function(length){
    logStrLength = length;  //log strings length
}
module.exports.setLogHeader = function(){  // log header
    console.log('=-'+new Date()+'-=');
    console.log('=-             Log Created                -=');
    console.log('\n');
}