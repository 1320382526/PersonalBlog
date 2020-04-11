var url = require('url');
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


function queryBlogByPage(request, response){
    var page = parseInt(url.parse(request.url, true).query.page);
    var pageSize = parseInt(url.parse(request.url, true).query.pageSize);
    blogDao.queryBlog(page, pageSize, function (result){
        
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',result));
        response.end();
    })


}

path.set('/queryBlogByPage', queryBlogByPage);

function queryBlogById(request, response){
    var Id = url.parse(request.url, true).query.Id;
    blogDao.queryBlogById(Id, function (result){
        
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',result));
        response.end();
    })


}

path.set('/queryBlogById', queryBlogById);


module.exports.path = path;