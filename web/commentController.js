var commentDao = require('./../dao/commentDao');
var timeUtil = require('./../util/TimeUtil');
var respUtil = require('./../util/RespUtil')
var url = require('url');

var path = new Map();

function addComment(request, response){
    var blog_id = url.parse(request.url, true).query.blog_id;
    var user_name = url.parse(request.url, true).query.user_name;
    var parent = url.parse(request.url, true).query.parent;
    var email = url.parse(request.url, true).query.email;
    var comments = url.parse(request.url, true).query.comments;
    //console.log(url.parse(request.url, true))

    commentDao.addComment(blog_id, parent, user_name, comments, email, timeUtil.getNow(), timeUtil.getNow(), function (result){
        response.writeHead(200);
        response.write(respUtil.writeResult('success','添加成功',null))
        response.end();
    })


}


path.set('/addComment', addComment);

module.exports.path = path;