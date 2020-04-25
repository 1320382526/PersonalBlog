var url = require('url');
var blogDao = require('./../dao/BlogDao');
var tagsDao = require('./../dao/tagsDao');
var tagBlogMappingDao = require('./../dao/TagBlogMappingDao');
var timeUtil = require('./../util/TimeUtil');
var respUtil = require('./../util/RespUtil');
var path = new Map();


/**
 * post请求添加博客文章
 * 
 * @param {*} request 
 * @param {*} response 
 */
function insertBlog(request, response){
    request.on('data', function (data){
        var dataInfo = JSON.parse(data.toString()).data;
        blogDao.insertBlog(dataInfo.title, dataInfo.content, dataInfo.tags, 0, timeUtil.getNow(), timeUtil.getNow(), function (result){
            response.writeHead(200);
            response.write(respUtil.writeResult('success','添加成功',null));
            response.end();
            //添加成功后续操作
            //添加标签，添加博客标签关系信息
            var blogId = result.insertId;
            var tagList = dataInfo.tags.split(',');
            for(var i = 0; i < tagList.length; i++){
                queryTag(tagList[i], blogId);
            }
        })
        
    });
    function queryTag(tag, blogId){
        tagsDao.queryTag(tag, function (result){
            if(result == null || result.length == 0){
                insertTag(tag, blogId);
            }else{
                insertTagBlog(result[0].id, blogId)
            }
        })
    }
    //添加标签
    function insertTag(tag, blogId){  
        tagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (result){
            insertTagBlog(result.insertId, blogId)
        })
    }
    //添加博客，标签关系信息
    function insertTagBlog (tagId, blogId){  
        tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result){})
    }
}
path.set('/api/blog/insertBlog', insertBlog);


//根据页码，页容量查询博客文章
function queryBlogByPage(request, response){
    var page = parseInt(url.parse(request.url, true).query.page);
    var pageSize = parseInt(url.parse(request.url, true).query.pageSize);
    blogDao.queryBlog(page, pageSize, function (result){       
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',result));
        response.end();
    })
}
path.set('/api/blog/queryBlogByPage', queryBlogByPage);



//根据id查询博客文章信息
function queryBlogById(request, response){   
    var Id = url.parse(request.url, true).query.Id;
    blogDao.queryBlogById(Id, function (result){       
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',result));
        response.end();
        blogDao.addViews(Id)//查看记录加1
    })
}
path.set('/api/blog/queryBlogById', queryBlogById);


//热门博客列表
function queryBlogByViews(request, response){   
    blogDao.queryBlogByViews(function (result){        
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询成功',result));
        response.end();
    })
}
path.set('/api/blog/queryBlogByViews', queryBlogByViews);


//所有博客列表
function queryAllBlog(request, response){   
    blogDao.queryAllBlog(function (resultAll){
        blogDao.queryBlogCount(function (resultCount){
            response.writeHead(200);
            resultAll.count = resultCount[0].count; //数量
            response.write(respUtil.writeResult('success','查询成功',resultAll));
            response.end();
        })
        
    })
}
path.set('/api/blog/queryAllBlog', queryAllBlog);


/**
 * 根据检索关键字，标签
 * 查询博客列表
 * 
 * @param {*} request 
 * @param {*} response 
 */
function queryBlogBySearch(request, response){   
    var s = url.parse(request.url, true).query.s; //关键字
    var tag = url.parse(request.url, true).query.tag; //标签
    console.log(url.parse(request.url, true))
    if(s){
        blogDao.queryBlogBySearch(s, function (resultAll){
            blogDao.queryBlogBySearchCount(s, function (resultCount){
                resultAll.count = resultCount[0].count;
                response.writeHead(200);
                response.write(respUtil.writeResult('success','查询成功',resultAll));
                response.end();
            })            
        })
    }else if(tag){
        tagsDao.queryTag(tag, function (resultAll){
            tagsDao.queryTagCount(tag, function (resultCount){
                resultAll.count = resultCount[0].count;
                response.writeHead(200);
                response.write(respUtil.writeResult('success','查询成功',resultAll));
                response.end();
            })            
        })
    }else{
        response.writeHead(200);
        response.write(respUtil.writeResult('success','查询失败',null));
        response.end();
    }
}
path.set('/api/blog/queryBlogBySearch', queryBlogBySearch);


module.exports.path = path;