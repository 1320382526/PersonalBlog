var dbutil = require('./util');

function insertBlog(title, content, tags, views, ctime, utime, success){
    var insertSql = "insert into blog (`title`, `content`, `tags`, `views`, `ctime`, `utime`) values (?,?,?,?,?,?)";
    var params = [title, content, tags, views, ctime, utime];
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

function queryBlog(page, pageSize, success){
    var querySql = "select *,(select count(*) from blog) as count from blog order by id desc limit ?, ?";
    var params = [(page -1) * pageSize, pageSize];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result){
        if(error == null){
            
            success(result);
            
        }else{

            throw new Error('error')
        }
    });

    connection.end();


}

function queryBlogById(Id, success){
    var querySql = "select * from blog where id = ?";
    var params = [Id];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result){
        if(error == null){
            
            success(result);
            
        }else{

            throw new Error('error')
        }
    });

    connection.end();


}

module.exports = {
    queryBlog,
    insertBlog,
    queryBlogById
}