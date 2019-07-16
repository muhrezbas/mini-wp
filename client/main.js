var instance = axios.create({
    baseURL: 'http://localhost:3000/api/'
});

var app = new Vue({
    el: '#app',
    created() {
        instance.get('/articles', {
        })
            .then(({ data }) => {

                this.posts = data
                console.log(this.posts)
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    },
    data: {
        rubah: false,
        add: false,
        update:false,
        search: '',
        newTitle: '',
        newTime: '',
        newImg: '',
        onePost:'',
        newStory: '',
        posts: [],
        isActive: true
    },
    components: {
        Editor
    },
    methods: {
        posted:function(arg){
            this.add = arg
            console.log('post: ',arg);
        },
       
        viewPost:function(arg){
            console.log('disini')
            this.viewPost(arg)
            console.log('view: ',arg);
        },
        deleting:function(){
            console.log('disini')
            this.delete(this.onePost._id)
            console.log('view: ');
        },
        edit:function(arg){
            console.log('disini')
            this.editPost(arg)
            console.log('view: ',arg);
        },
        updated:function(arg){
            this.update = arg
            console.log('update: ',arg);
        },
        custom:function(arg){
            this.rubah = arg
            console.log('custom: ',arg);
        },
        handlerUpdate:function(arg1,arg2){
            console.log('disini')
            this.viewPost(arg1);
            this.updated(arg2);
        },
        handlerArticles:function(arg1){
            console.log('disini')
            this.posted(false);
            this.updated(false);
            this.custom(false);
        },

        handlerPost:function(){
            console.log('disini')
            this.posted(true);
            this.updated(false);
            this.custom(false);
        },
        handlerEdit:function(){
            console.log('disini')
            this.custom(true);
            this.updated(false);
        },
        handlerDelete:function(){
            console.log('disini')
            this.deleting()
            this.posted(false);
            this.updated(false);
            this.custom(false);
            
        },
        handlerAfterEdit:function(){
            this.posted(false);
            this.updated(true);
            this.custom(false);
        },
        editPost(){
            instance.put(`/articles/${this.onePost._id}`, {
                title: this.onePost.title,
                content: this.onePost.content
            })
                .then(({ data }) => {
                    console.log(data)
                    this.viewPost(onePost._id)
                    this.getData()
                })
                .catch(function (error) {
                    console.log(error.response);
                })
                .then(function () {
                    // always executed
                });
        },
        delete(id){
            console.log(id,"disini")
            instance.delete(`/articles/${id}`, {
            })
                .then(({ data }) => {
                    this.getData()
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        viewPost(id){
            console.log(id,"disini")
            instance.get(`/articles/${id}`, {
            })
                .then(({ data }) => {
    
                    this.onePost = data
                    console.log(this.onePost, "disini")
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        addPost() {
            instance.post('/articles', {
                title: this.newTitle,
                content: this.newStory
            })
                .then(({ data }) => {
                    console.log(data)
                    this.getData()
                })
                .catch(function (error) {
                    console.log(error.response);
                })
                .then(function () {
                    // always executed
                });
            this.newTitle = ''
            this.newTime = ''
            this.newImg = ''
            this.newStory = ''
        },
        getData() {
            instance.get('/articles', {
            })
                .then(({ data }) => {
    
                    this.posts = data
                    console.log(this.posts, "disini")
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

    },
    computed: {
        filteredList() {
            return this.posts.filter(post => {
                return post.title.toLowerCase().includes(this.search.toLowerCase())
            })
        },
        timeAgo(date) {
            console.log(date)
            for (var i = 0; i < this.posts.length; i++) {
                var date = new Date(this.posts[i].createdAt)
                var msPerMinute = 60 * 1000;
                var msPerHour = msPerMinute * 60;
                var msPerDay = msPerHour * 24;
                var msPerMonth = msPerDay * 30;
                var msPerYear = msPerDay * 365;
                var previous = date
                // return previous

                var elapsed = new Date() - previous;

                if (elapsed < msPerMinute) {
                    return Math.round(elapsed / 1000) + ' seconds ago';
                }

                else if (elapsed < msPerHour) {
                    return Math.round(elapsed / msPerMinute) + ' minutes ago';
                }

                else if (elapsed < msPerDay) {
                    return Math.round(elapsed / msPerHour) + ' hours ago';
                }

                else if (elapsed < msPerMonth) {
                    return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
                }

                else if (elapsed < msPerYear) {
                    return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
                }

                else {
                    return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
                }
            }


        }
    }
})