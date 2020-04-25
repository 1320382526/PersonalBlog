var dbutil = require('./util')

/**
 * 添加每日一句EveryDay
 * 
 * 
 * @param {*} content //内容
 * @param {*} ctime //创建时间
 * @param {*} success //成功时执行的方法
 */
function insertEveryDay (content, ctime, success) {
    var sql = "insert into every_day (`content`, `ctime`) values (?, ?)";
    var params = [content, ctime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function(error, result){
        if(error == null){
            success(result)
        }else{
            throw new Error(error)
        }
    })
    connection.end();

}


/**
 * 查询最新一条每日一句EveryDay
 * 
 * @param {*} success //成功时执行的方法
 */
function queryEveryDay (success) {
    var sql = "select * from every_day order by id desc limit 1";
    var params = [];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql, params, function(error, result){       
        if(error == null){            
            success(result)
        }else{            
            throw new Error(error)
        }
    })
    connection.end();

}

module.exports = {
    insertEveryDay,
    queryEveryDay
}