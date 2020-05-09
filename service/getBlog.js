// 抓取github的数据信息
const axios = require("axios").default;
const cheerio = require("cheerio");

/**
 * 获取github网页的源代码
 */
async function getBlogsHTML() {
    const resp = await axios.get("https://github.com/sup-fiveyear/Notes/issues?from=singlemessage");
    return resp.data;
}


/**
 * 从github得到一个完整的网页，并从网页中分析出文章的基本信息，然后得到一个文章的详情页链接数组
 */
async function getBlogLinks() {
    const html = await getBlogsHTML();
    
    const $ = cheerio.load(html);
    let eleArr = [];
    const children = $(".js-navigation-container.js-active-navigation-container>div").each(function (){
        var str = $(this).prop("id")
        eleArr.push("https://github.com/sup-fiveyear/Notes/" + str.replace(/_/g, 's/'))
    });
    return eleArr
    //https://github.com/sup-fiveyear/Notes/  拼接地址获取详细信息
    

  }


/**
 * 根据文章详情页的地址，得到该文章的详细信息
 * @param {*} detailUrl
 */
async function getBlogDetail(detailUrl) {
    const resp = await axios.get(detailUrl);
    const $ = cheerio.load(resp.data);
    const title = $(".js-issue-title").eq(1).text().trim();
    const content = $(".d-block.comment-body.markdown-body.js-comment-body").text();
    return {
      title,
      content,
      tags:title,
    };
  }





/**
 * 获取所有的文章信息
 */
async function fetchAll() {
    const links = await getBlogLinks(); 
    const proms = links.map((link) => {
      return getBlogDetail(link);
    });
    return Promise.all(proms);
  }
  

  


module.exports.fetchAll = fetchAll
  