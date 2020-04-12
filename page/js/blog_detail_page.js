//博客详情

var detail_blog = new Vue({
    el:'#detail_blog',
    data:{
        detail_blog: {
            id:'',
            title:'',
            content:'',
            views:'',
            tags:'',
            ctime:'',
            utime:''
        }
    },
    
    created(){

        var params = new URLSearchParams(location.search);
        var blog_id = params.get("blog_id");
        fetch('/queryBlogById?Id='+blog_id).then(res => res.json())
            .then(res => {
                var cDate = new Date(Number(res.data[0].ctime));
                var uDate = new Date(Number(res.data[0].utime));
                var tempObj = {
                    id:res.data[0].id,
                    title:res.data[0].title,
                    content:res.data[0].content,
                    views:res.data[0].views,
                    tags:res.data[0].tags,
                    ctime:"" + cDate.getFullYear() + (cDate.getMonth()+1) + cDate.getDate(),
                    utime:"" + uDate.getFullYear() + (uDate.getMonth()+1) + uDate.getDate()
                }
                this.detail_blog = tempObj
                
            })
    }
});
//留言

var comment = new Vue({
    el:'#comment',
    data:{
        
    },
    methods:{
        addComment(){
            var blog_id = detail_blog.detail_blog.id;
            var user_name = document.getElementById('user_name').value;
            var email = document.getElementById('email').value;
            var comments = document.getElementById('comments').value;
            fetch('/addComment?blog_id='+blog_id+'&user_name='+user_name+'&parent=-1&email='+email+'&comments='+comments).then(res => res.json())
            .then(res => {
                alert(res.msg)
                document.getElementById('user_name').value('');
                document.getElementById('email').value('');
                document.getElementById('comments').value('');
            })
        }
    },
    created(){
        
    }
});

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