
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
            .then(res => {this.content = res.data[0].content;
                var d = new Date(Number(res.data[0].ctime));
                this.ctime = "" + d.getFullYear() + (d.getMonth()+1) + d.getDate()
            })
    }
});


//文章列表
var everyDay = new Vue({
    el:'#article',
    data:{
        articleList:[{
            title:'Laravel5.4安装passport时遇到的一些问题',
            content:'安装时可能不支持高版本，我使用了composer require laravel/passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加Laravel\Passport\PassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。...',
            date:'2019-12-06',
            views:'5,487',
            tags:'test1 test2',
            id:'1',
            link:''
        },{
            title:'Laravel5.4安装passport时遇到的一些问题',
            content:'安装时可能不支持高版本，我使用了composer require laravel/passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加Laravel\Passport\PassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。...',
            date:'2019-12-06',
            views:'5,487',
            tags:'test1 test2',
            id:'1',
            link:''
        },{
            title:'Laravel5.4安装passport时遇到的一些问题',
            content:'安装时可能不支持高版本，我使用了composer require laravel/passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加Laravel\Passport\PassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。...',
            date:'2019-12-06',
            views:'5,487',
            tags:'test1 test2',
            id:'1',
            link:''
        },{
            title:'Laravel5.4安装passport时遇到的一些问题',
            content:'安装时可能不支持高版本，我使用了composer require laravel/passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加Laravel\Passport\PassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。...',
            date:'2019-12-06',
            views:'5,487',
            tags:'test1 test2',
            id:'1',
            link:''
        }]
    },
    created(){
        
    }
})

//随机标签云

var everyDay = new Vue({
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