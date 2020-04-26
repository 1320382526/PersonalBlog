var dbutil = require('./util');


/**
 * 
 * @param {*} blog_id //博客id （-1）代表评论博主 （-2）代表留言
 * @param {*} parent //回复父级评论id （-1）代表无
 * @param {*} user_name //用户名字
 * @param {*} comments //回复内容
 * @param {*} email //用户邮箱
 * @param {*} ctime //创建时间
 * @param {*} utime //修改时间
 * @param {*} success //成功时执行的方法
 */
function addComment(blog_id, parent, user, user_name, comments, email, ctime, utime, success){
    var sql = "insert into comments (`blog_id`, `parent`, `user`, `user_name`, `comments`, `email`, `ctime`, `utime`) values (?,?,?,?,?,?,?,?)";
    var params = [blog_id, parent, user, user_name, comments, email, ctime, utime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result){
        if(error == null){
            success(result);            
        }else{
            throw new Error(error)
        }
    });

    connection.end();


}

/**
 * 查询最新博客文章评论
 * （-1）代表评论博主
 * （-2）代表留言
 * 
 * @param {*} size 数量
 * @param {*} success 成功时执行的方法
 */
function queryCommentsByTime(size, success) {
    var sql = "select * from comments where blog_id != -1 and blog_id != -2 order by id desc limit ?;";
    var params = [parseInt(size)];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            throw new Error(error)
        }
    });
    connection.end();
}


/**
 * 根据blog_id查询评论
 * 
 * @param {*} blog_id 博客id（-1）回复博主 （-2）回复留言
 * @param {*} success 成功时执行的方法
 */
function queryCommentsByBlogId(blog_id, success) {
    var sql = "select * from comments where blog_id = ? order by id desc";
    var params = [parseInt(blog_id)];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            throw new Error(error)
        }
    });
    connection.end();
}

module.exports = {
    addComment,
    queryCommentsByTime,
    queryCommentsByBlogId
}