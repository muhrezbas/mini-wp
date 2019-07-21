<template>
  <div style="padding-top: 17px;" class="container">
    <div class="row">
      <div class="col-sm-8 blog-main">
        <div class="blog-post">
          <h2 class="blog-post-title">{{ onePost.title }}</h2>
          <p class="blog-post-meta">
            {{ getAgo(onePost.updatedAt) }} by
            <a href="#">{{onePost.author.username}}</a>
          </p>
        </div>
         <div style="width:231px">
        <img :src="onePost.image" class="rounded float-left img-fluid" alt="image">
        </div>
        <!-- /.blog-main -->
        <div v-html="onePost.content"></div>
      </div>
      <div class="col-sm-3 offset-sm-1 blog-sidebar">
        <div class="sidebar-module sidebar-module-inset">
          <a>
            <button type="button" @click="getEdit(onePost._id)" class="btn btn-primary">Edit</button>
            <button
              style="margin-left: 5px"
              type="button"
              @click="getDelete(onePost._id)"
              class="btn btn-danger"
            >Delete</button>
          </a>
          <!-- <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p> -->
        </div>
        <!-- <div class="sidebar-module">
                                  <h4>Archives</h4>
                                  <ol class="list-unstyled">
                                    <li><a href="#">March 2014</a></li>
                                    <li><a href="#">February 2014</a></li>
                                    <li><a href="#">January 2014</a></li>
                                    <li><a href="#">December 2013</a></li>
                                    <li><a href="#">November 2013</a></li>
                                    <li><a href="#">October 2013</a></li>
                                    <li><a href="#">September 2013</a></li>
                                    <li><a href="#">August 2013</a></li>
                                    <li><a href="#">July 2013</a></li>
                                    <li><a href="#">June 2013</a></li>
                                    <li><a href="#">May 2013</a></li>
                                    <li><a href="#">April 2013</a></li>
                                  </ol>
        </div>-->
        <!-- <div class="sidebar-module">
                                  <h4>Elsewhere</h4>
                                  <ol class="list-unstyled">
                                    <li><a href="#">GitHub</a></li>
                                    <li><a href="#">Twitter</a></li>
                                    <li><a href="#">Facebook</a></li>
                                  </ol>
        </div>-->
      </div>
    </div>
  </div>
  <!-- <script>
                    CKEDITOR.replace('editor1');
  </script>-->
</template>

<script>
import moment from 'moment'
var instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    token : localStorage.getItem("token")
  }
});
export default {
  props: ["onePost","token"],
  methods: {
    getEdit(id) {
      console.log(id, "post");
      this.$emit("show-edit", id);
    },
    getDelete(id) {
      instance
        .delete(`/articles/${id}`, {})
        .then(({ data }) => {
            this.$emit("getArticle")
             Swal.fire({
            type:'success',
            text:'delete success'
          })
            
        })
        .catch(function(error) {
          console.log(error);
          Swal.fire({
            type:'error',
            text:'not authorize'
          })
        });
    },
     getAgo(date){
            return moment(date).fromNow();
      },
  }
};
</script>

<style>
</style>
