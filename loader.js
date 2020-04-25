var fs = require('fs');
var globalConfig = require('./config.json');
var controllerSet = [];
var pathMap = new Map();
var files = fs.readdirSync("./"+globalConfig.web_path);

//解析所有请求
for(var i = 0; i < files.length; i++) {
    var temp = require("./" + globalConfig.web_path + "/" +files[i]);
    if(temp.path){
        for(var [key, value] of temp.path){
            if(pathMap.get(key) == null){
                pathMap.set(key, value);
            }else{
                throw new Error('url不正确！')
            }
        }
        controllerSet.push(temp);
    }
}
module.exports = pathMap
