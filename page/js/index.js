
//每日一句
var everyDay = new Vue({
    el:'#every_day',
    data:{
        ctime:'2020-04-10',
        content:'You were born with wings. Why prefer to crawl through life?'
    },
    computed:{
        getContent(){
            return this.content;
        }
    },
    created(){
        //ajax获取每日一句内容
        fetch('/queryEveryDay').then(res => res.json())
            .then(res => {
                if(res.data.length>0){
                    this.content = res.data[0].content;
                    var d = new Date(Number(res.data[0].ctime));
                    this.ctime = "" + d.getFullYear() + (d.getMonth()+1) + d.getDate()
                }
                
            })
    }
});


//文章列表
var article = new Vue({
    el:'#article',
    data:{
        page: 1,
        pageSize: 6,
        count: 0,
        articleList:[]
    },
    methods:{
        queryBlogByPage(page){
            if(page == this.page){
                return;
            }
            if(page <= 1){
                page = 1;
            }
            if(page >= Math.ceil(this.count/this.pageSize)){
                page = Math.ceil(this.count/this.pageSize);
            }
            this.page = page;
            fetch("/queryBlogByPage?page="+this.page+"&pageSize="+this.pageSize).then(res => res.json())
            .then(res => {
                var tempArr = [];
                for(var i = 0; i < res.data.length; i++){
                    tempArr.push({
                        title: res.data[i].title,
                        content: res.data[i].content,
                        date: "" + (new Date(parseInt(res.data[i].ctime)).getFullYear()) +"-"+ (new Date(parseInt(res.data[i].ctime)).getMonth() + 1) +"-"+ (new Date(parseInt(res.data[i].ctime)).getDate()),
                        views: res.data[i].views,
                        id: res.data[i].id,
                        tags: res.data[i].tags.split(',').join(' '),
                        link: res.data[i].id,
                    })
                }
                this.articleList = tempArr;
            })
        }
    },
    created(){
        fetch("/queryBlogByPage?page="+this.page+"&pageSize="+this.pageSize).then(res => res.json())
            .then(res => {
                if(res.data.length > 0){
                    this.count = res.data[0].count;
                }
                
                for(var i = 0; i < res.data.length; i++){
                    this.articleList.push({
                        title: res.data[i].title,
                        content: res.data[i].content,
                        date: "" + (new Date(parseInt(res.data[i].ctime)).getFullYear()) +"-"+ (new Date(parseInt(res.data[i].ctime)).getMonth() + 1) +"-"+ (new Date(parseInt(res.data[i].ctime)).getDate()),
                        views: res.data[i].views,
                        id: res.data[i].id,
                        tags: res.data[i].tags.split(',').join(' '),
                        link: res.data[i].id,
                    })
                }
            })
    }
})

//随机标签云

var random_tags = new Vue({
    el:'#random_tags',
    data:{
        tags:['caccsc','sadsdasd','dsadadw','gregregre','caccsc','sadsdasd','dsadadw','gregregre','sadsdasd','dsadadw','gregregre','caccsc','sadsdasd','dsadadw','gregregre']
    },
    methods:{
        getColor(){
            return `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`
        },
        getFontSize(){
            
            return `${Math.random()*20+5}px`
        }
    },
    created(){
        
    }
});

//最近热门

var newHot = new Vue({
    el:'#new_hot',
    data:{
        titleList:[{
            title:'这是链接',
            link:'#'
        },{
            title:'这是链接',
            link:'#'
        },{
            title:'这是链接',
            link:'#'
        },{
            title:'这是链接',
            link:'#'
        },{
            title:'这是链接',
            link:'#'
        },{
            title:'这是链接',
            link:'#'
        },{
            title:'这是链接',
            link:'#'
        }]
    },
    created(){
        
    }
});

//最新评论

var newComments = new Vue({
    el:'#new_comments',
    data:{
        commentList:[{
            name:'这是用户名',
            date:'2020-04-10',
            comment:'ddsadsadsaddsadsadsaddsadsadsaddsadsadsaddsadsadsaddsadsadsa'
        },{
            name:'这是用户名',
            date:'2020-04-10',
            comment:'ddsadsadsaddsadsadsaddsadsadsaddsadsadsaddsadsadsaddsadsadsa'
        },{
            name:'这是用户名',
            date:'2020-04-10',
            comment:'ddsadsadsaddsadsadsaddsadsadsaddsadsadsaddsadsadsaddsadsadsa'
        },{
            name:'这是用户名',
            date:'2020-04-10',
            comment:'ddsadsadsaddsadsadsaddsadsadsaddsadsadsaddsadsadsaddsadsadsa'
        },{
            name:'这是用户名',
            date:'2020-04-10',
            comment:'ddsadsadsaddsadsadsaddsadsadsaddsadsadsaddsadsadsaddsadsadsa'
        },{
            name:'这是用户名',
            date:'2020-04-10',
            comment:'ddsadsadsaddsadsadsaddsadsadsaddsadsadsaddsadsadsaddsadsadsa'
        },{
            name:'这是用户名',
            date:'2020-04-10',
            comment:'ddsadsadsaddsadsadsaddsadsadsaddsadsadsaddsadsadsaddsadsadsa'
        }]
    },
    created(){
        
    }
});