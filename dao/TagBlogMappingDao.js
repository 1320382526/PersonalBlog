var dbutil = require('./util');

function insertTagBlogMapping(tagId, blogId, ctime, utime, success){
    //console.log(tagId, blogId, ctime, utime)
    var insertSql = "insert into tag_blog_mapping (`tag_id`, `blog_id`, `ctime`, `utime`) values (?,?,?,?)";
    var params = [tagId, blogId, ctime, utime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result){
        if(error == null){
            success(result);
        }else{
            throw new Error('error')
        }
    });

    connection.end();


}

module.exports.insertTagBlogMapping = insertTagBlogMapping