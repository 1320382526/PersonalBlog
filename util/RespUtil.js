
/**
 * 格式化返回信息Result
 * 
 * @param {*} status 响应状态码
 * @param {*} msg //相关信息
 * @param {*} data //返回的数据
 */

function writeResult(status, msg, data){
    return JSON.stringify({status,msg,data})
}

module.exports = {
    writeResult
}