var everyDayDao = require('./../dao/EveryDayDao');
var timeUtil = require('./../util/TimeUtil');
var respUtil = require('./../util/RespUtil')

var path = new Map();

/**
 * post请求添加每日一句
 * 
 * @param {*} request 
 * @param {*} response 
 */
function insertEveryDay(request, response){   
    request.on('data', function (data){
        everyDayDao.insertEveryDay(JSON.parse(data.toString()).content, timeUtil.getNow(), function (result){
            response.writeHead(200);
            response.write(respUtil.writeResult('success','添加成功',null))
            response.end();
        })
    })

}
path.set('/api/everyday/indertEveryDay', insertEveryDay);


//返回最新每日一句内容
function queryEveryDay(request, response){
        everyDayDao.queryEveryDay(function (result){
            response.writeHead(200);
            response.write(respUtil.writeResult('success','查询成功',result))
            response.end();
        })
}
path.set('/api/everyday/queryEveryDay', queryEveryDay);

module.exports.path = path;