const { fetchAll } = require('./getBlog');
var blogDao = require('../dao/BlogDao');
const axios = require("axios").default;


module.exports.init = ()=> {

    blogDao.queryAllBlog( res => {
        const arrTitle = res.map(item => item.title);
        fetchAll().then(res => {
            const result = res.filter(value => !arrTitle.includes(value.title));
            result.forEach(item => {
                axios.post('http://localhost:12306/api/blog/insertBlog', {
                    ...item,
                })
                  .then(function (response) {
                    console.log(response);
                })
                  .catch(function (error) {
                    console.log(error);
                });
            })
            
        })
    }); 
    

} 


    
    






