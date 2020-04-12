var dbutil = require('./util');

function addComment(blog_id, parent, user_name, comments, email, ctime, utime, success){
    var insertSql = "insert into comments (`blog_id`, `parent`, `user_name`, `comments`, `email`, `ctime`, `utime`) values (?,?,?,?,?,?,?)";
    var params = [blog_id, parent, user_name, comments, email, ctime, utime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result){
        if(error == null){
            console.log('1',params)
            success(result);
            
        }else{
            console.log('2',params)
            throw new Error('error')
        }
    });

    connection.end();


}

module.exports = {
    addComment
}