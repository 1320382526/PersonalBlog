var dbUtil = require('./util')

/**
 * 添加标签tag
 * 
 * @param {*} tag //标签内容
 * @param {*} ctime //创建时间（时间戳）
 * @param {*} utime //修改时间（时间戳）
 * @param {*} success  //成功时执行的方法
 */
function insertTag (tag, ctime, utime, success) {    
    var sql = "insert into tags (`tag`, `ctime`, `utime`) values (?,?,?)";
    var params = [tag, ctime, utime];
    var connection = dbUtil.createConnection();
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
 * 根据标签内容查询tag,左连接表tag_blog_mapping，blog
 * 获得blog数据
 * 
 * @param {*} tag //标签内容
 * @param {*} page //页码
 * @param {*} pageSize //每页数量
 * @param {*} success  //成功时执行的方法
 */

function queryTag (tag, page, pageSize, success) {
    var sql = "select c.* from tags a left join tag_blog_mapping b on a.id = b.tag_id left join blog c on b.blog_id = c.id where a.tag = ? order by c.id desc limit ?, ?";
    var params = [tag, (page -1) * pageSize, pageSize];
    var connection = dbUtil.createConnection();
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
 * 根据标签内容查询tag,左连接表tag_blog_mapping，blog
 * 获得blog数据总数
 * 
 * @param {*} tag //标签内容
 * @param {*} success  //成功时执行的方法
 */

function queryTagCount (tag, success) {
    var sql = "select count(1) as count from tags a left join tag_blog_mapping b on a.id = b.tag_id left join blog c on b.blog_id = c.id where a.tag = ?";
    var params = [tag];
    var connection = dbUtil.createConnection();
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
 * 查询所有标签
 * 
 * @param {*} success //成功时执行的方法
 */

function queryAllTags(success) {  
    var sql = "select * from tags;";
    var connection = dbUtil.createConnection();
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

module.exports = {
    insertTag,
    queryTag,
    queryAllTags,
    queryTagCount
     
}
