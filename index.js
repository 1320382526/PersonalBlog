var express = require('express');   //引入express框架

var app = new express();

app.use(express.static('./page/'));   //静态文件请求


app.listen(12305, function () {
    console.log('服务器已启动')
})  //监听端口