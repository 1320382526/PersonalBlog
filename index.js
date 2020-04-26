var express = require('express');   //引入express框架
var globalConfig = require('./config.json'); //配置文件
var loader = require("./loader")

var app = new express();

app.use(express.static('./page/'));   //请求的静态文件请求
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.get("/api/everyday/queryEveryDay", loader.get('/api/everyday/queryEveryDay'));  //查询每日一句
app.post("/api/everyday/indertEveryDay", loader.get('/api/everyday/indertEveryDay')); //添加每日一句

app.get("/api/blog/queryBlogById", loader.get('/api/blog/queryBlogById'));  //根据id获取博客文章
app.get("/api/blog/queryBlogByPage", loader.get('/api/blog/queryBlogByPage')); //根据页码获取博客列表
app.get("/api/blog/queryBlogByViews", loader.get('/api/blog/queryBlogByViews'));  //查询热门博客列表
app.get("/api/blog/queryAllBlog", loader.get('/api/blog/queryAllBlog'));  //查询所有博客
app.get("/api/blog/queryBlogBySearch", loader.get('/api/blog/queryBlogBySearch'));  //根据内容查询博客列表
app.post("/api/blog/insertBlog", loader.get('/api/blog/insertBlog')); //添加博客文章

app.post("/api/comment/addComment", loader.get('/api/comment/addComment'));  //提交评论
app.get("/api/comment/getRandomCode", loader.get('/api/comment/getRandomCode'));  //验证码
app.get("/api/comment/queryCommentsByTime", loader.get('/api/comment/queryCommentsByTime'));  //查询最新评论
app.get("/api/comment/queryCommentsByBlogId", loader.get('/api/comment/queryCommentsByBlogId'));  //根据blog_id查询评论

app.get("/api/tags/queryAllTags", loader.get('/api/tags/queryAllTags'));  //查询随机标签

//匹配不到返回404.
app.all('*', function (req, res) {
    res.writeHead(400);
    res.write('<!DOCTYPE html><html lang=en><head><meta charset=utf-8><meta http-equiv=X-UA-Compatible content="IE=edge"><meta name=viewport content="width=device-width,initial-scale=1"><title>personal-blog</title></head><body><h1>很抱歉，您要访问的页面不存在！</h1></body></html>');
    res.end();
});






app.listen(globalConfig.port, function () {
    console.log('服务器已启动')
})  //监听端口