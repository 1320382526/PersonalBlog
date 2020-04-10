var blogDao = require('./../dao/BlogDao');
var tagsDao = require('./../dao/tagsDao');
var tagBlogMappingDao = require('./../dao/TagBlogMappingDao')
var timeUtil = require('./../util/TimeUtil');
var respUtil = require('./../util/RespUtil');
var path = new Map();

function editBlog(request, response){
    request.on('data', function (data){
        var dataInfo = JSON.parse(data.toString()).data;
        blogDao.insertBlog(dataInfo.title, dataInfo.content, dataInfo.tags, 0, timeUtil.getNow(), timeUtil.getNow(), function (result){
            response.writeHead(200);
            response.write(respUtil.writeResult('success','添加成功',null));
            response.end();
            var blogId = result.insertId;
            var tagList = dataInfo.tags.split(',');
            for(var i = 0; i < tagList.length; i++){
                queryTag(tagList[i], blogId);
            }
        })
    })
}



function queryTag(tag, blogId){
    tagsDao.queryTag(tag, function (result){
        if(result == null || result.length == 0){
            insertTag(tag, blogId);
        }else{
            insertTagBlog(result[0].id, blogId)
        }
    })
}

function insertTag(tag, blogId){
    tagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (result){
        insertTagBlog(result.insertId, blogId)
    })
}

function insertTagBlog (tagId, blogId){
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result){})
}

path.set('/editBlog', editBlog);

module.exports.path = path;