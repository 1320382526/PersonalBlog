var dbutil = require('./util');

/**
 * 根据标签id和博客id建立关系
 * insertTagBlogMapping
 * 
 * @param {*} tagId //标签id
 * @param {*} blogId //博客id
 * @param {*} ctime //创建时间
 * @param {*} utime //修改时间
 * @param {*} success //成功时执行的方法
 */

function insertTagBlogMapping(tagId, blogId, ctime, utime, success){
    var sql = "insert into tag_blog_mapping (`tag_id`, `blog_id`, `ctime`, `utime`) values (?,?,?,?)";
    var params = [tagId, blogId, ctime, utime];
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

module.exports = {
    insertTagBlogMapping
} 