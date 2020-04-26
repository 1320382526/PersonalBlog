var commentDao = require('./../dao/commentDao');
var timeUtil = require('./../util/TimeUtil');
var respUtil = require('./../util/RespUtil');
var captcha = require("svg-captcha");
var url = require('url');

var path = new Map();

/**
 * post请求添加评论
 * 
 * @param {*} request 
 * @param {*} response 
 */
function addComment(request, response){
    request.on('data', function (data){
        var dataInfo = JSON.parse(data.toString()); //数据体
        commentDao.addComment(dataInfo.blog_id, dataInfo.parent, dataInfo.user, dataInfo.user_name, dataInfo.comments, dataInfo.email, timeUtil.getNow(), timeUtil.getNow(), function (result){
            response.writeHead(200);
            response.write(respUtil.writeResult('success','添加成功',null))
            response.end();
        })
    })  
}
path.set('/api/comment/addComment', addComment);


//最新评论
function queryCommentsByTime(request, response){
    var size = url.parse(request.url, true).query.size;
    commentDao.queryCommentsByTime(size, function (result){
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',result))
        response.end();
    })
}
path.set('/api/comment/queryCommentsByTime', queryCommentsByTime);


//获取验证码
function getRandomCode(request, response){  
    var img = captcha.create({fontSize: 50, width: 100, height: 34});
    response.writeHead(200);
    response.end(JSON.stringify(img));
}
path.set('/api/comment/getRandomCode', getRandomCode);


//根据blog_id查询评论
function queryCommentsByBlogId(request, response){
    var blog_id = url.parse(request.url, true).query.blog_id;
    commentDao.queryCommentsByBlogId(blog_id, function (result){
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',result))
        response.end();
    })
}
path.set('/api/comment/queryCommentsByBlogId', queryCommentsByBlogId);

module.exports.path = path;