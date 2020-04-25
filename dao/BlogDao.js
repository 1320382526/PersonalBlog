var dbutil = require('./util');

/**
 * 添加博客文章
 * 
 * @param {*} title //博客标题
 * @param {*} content //博客内容
 * @param {*} tags //相关标签
 * @param {*} views //查看数量
 * @param {*} ctime //创建时间
 * @param {*} utime //修改时间
 * @param {*} success //成功时执行的方法
 */
function insertBlog(title, content, tags, views, ctime, utime, success){
    var sql = "insert into blog (`title`, `content`, `tags`, `views`, `ctime`, `utime`) values (?,?,?,?,?,?)";
    var params = [title, content, tags, views, ctime, utime];
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
 * 根据页码，每页数量
 * 查询博客文章列表
 * 
 * @param {*} page //页码
 * @param {*} pageSize //每页数量
 * @param {*} success //成功时执行的方法
 */
function queryBlog(page, pageSize, success){
    var sql = "select * from blog order by id desc limit ?, ?";
    var params = [(page -1) * pageSize, pageSize];
    console.log(params)
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
 * 查询所有博客文章数量
 * 所有博客文章数量
 * @param {*} success //成功时执行的方法
 */
function queryBlogCount(success) {  
    var sql = "select count(1) as count from blog";
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            success(result);
        }
    });
    connection.end();
}

/**
 * 根据id查询博客文章
 * 
 * @param {*} Id //博客id
 * @param {*} success //成功时执行的方法
 */
function queryBlogById(Id, success){  
    var sql = "select * from blog where id = ?";
    var params = [Id];
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
 * 查看博客文章 + 1
 * 
 * @param {*} id //博客id
 * @param {*} success //成功时执行的方法
 */
function addViews(id) {   
    var sql = "update blog set views = views + 1 where id = ?;";
    var params = [id];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function (error) {
        if (error) {
            throw new Error(error)
        }
    });
    connection.end();
}


/**
 * 热门博客
 * views查看数量、
 * 
 * @param {*} success //成功时执行的方法
 */
function queryBlogByViews(success) {  
    var sql = "select * from blog order by views desc limit 7;";
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, function (error, result) {
        if (error == null) {
            success(result);           
        } else {
            throw new Error(error)
        }
    });
    connection.end();
}


/**
 * 查询所有博客文章
 * 
 * @param {*} success //成功时执行的方法
 */
function queryAllBlog(success) {  
    var sql = "select * from blog";
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            throw new Error(error)
        }
    });
    connection.end();
}


/**
 * 关键字搜索博客文章
 * 
 * @param {*} search //搜索内容
 * @param {*} page //页码
 * @param {*} pageSize //每页数量
 * @param {*} success //成功时执行的方法
 */
function queryBlogBySearch(search, page, pageSize, success) {
    var sql = "select * from blog where title like concat(concat('%', ?), '%') or content like concat(concat('%', ?), '%') order by id desc limit ?, ?;";
    var params = [search, search, (page -1) * pageSize, pageSize];
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
 * 搜索博客文章数量
 * @param {*} search //搜索内容
 * @param {*} success //成功时执行的方法
 */
function queryBlogBySearchCount(search, success) {  
    var sql = "select count(1) as count from blog where title like \"%?%\" or content like \"%?%\";";
    var params = [search, search];
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
    queryBlog,
    insertBlog,
    queryBlogById,
    addViews,
    queryBlogByViews,
    queryAllBlog,
    queryBlogBySearch,
    queryBlogCount,
    queryBlogBySearchCount
}