var tagsDao = require("../dao/tagsDao");
var respUtil = require('./../util/RespUtil');
var path = new Map();

//随机返回标签
function queryAllTags(request, response){
    tagsDao.queryAllTags(function (result){
        result.sort(function () {
            return 0.5 - Math.random();
        });
        result = result.slice(0,15);
        response.writeHead(200);
        response.write(respUtil.writeResult('success','添加成功',result))
        response.end();
    })


}

path.set('/api/tags/queryAllTags', queryAllTags);

module.exports.path = path;