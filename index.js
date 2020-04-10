var express = require('express');   //引入express框架
var globalConfig = require('./config.json'); //配置文件

var loader = require("./loader")

var app = new express();

app.use(express.static('./page/'));   //静态文件请求

app.get("/queryEveryDay", loader.get('/queryEveryDay'));
app.post("/editEveryDay", loader.get('/editEveryDay'));
app.post("/editBlog", loader.get('/editBlog'));
app.listen(globalConfig.port, function () {
    console.log('服务器已启动')
})  //监听端口