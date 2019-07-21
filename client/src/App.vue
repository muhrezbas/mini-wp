<template>
<div>
  <NavBar v-on:get-token="getToken" :token="token" v-on:sign-out="signOut" v-on:getWrite="getWrite"></NavBar>
  <body>
    <div v-if="token" style="margin-top: 56px;">
      <SideBar
        :token="token"
        :showAddArticle="showAddArticle"
        v-on:getWrite="getWrite"
        v-on:getArticle="getArticle"
      ></SideBar>
      <!-- Page content -->
      <Content
        :token="token"
        :onePost="onePost"
        v-on:getArticle="getArticle"
        v-on:show-edit="getEdit"
        :showEdit="showEdit"
        :showPost="showPost"
        v-on:show-post="getPost"
        :articles="articles"
        :showArticle="showArticle"
        :showAddArticle="showAddArticle"
      ></Content>
    </div>
    <Footer></Footer>

    <!-- src="https://upload.wikimedia.org/wikipedia/commons/9/93/Wordpress_Blue_logo.png" -->
  </body>
  <!-- <div style="margin-top: 0px; height: 100vh;" class="d-flex bd-highlight">
      <Content :articles="articles" v-on:change-story="changeStory"></Content>
      <SideBar
        :showStory="showStory"
        :storyPayload="storyPayload"
        v-on:add-story="addStory"
        :comments="comments"
        :get-comment="getComment"
        v-on:add-comment="addComment"
      ></SideBar>
  </div>-->
</div>
</template>

<script>
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from "axios";
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import SideBar from "./components/SideBar.vue";
import Content from "./components/Content.vue";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import GAuth from "vue-google-oauth2";
import VueSwal from "vue-swal";

const gauthOption = {
  clientId:
    "867285609478-g49k556cljvfvrb3bdl99rf0qhv7cg68.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "select_account"
};
Vue.use(GAuth, gauthOption);

Vue.use(BootstrapVue);

Vue.use(VueSwal);
// var Editor = require('@tinymce/tinymce-vue').default;
var instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    token: localStorage.getItem("token")
  }
});

export default {
  data() {
    return {
      idAdd: "",
      token: localStorage.getItem("token"),
      message: "Hello world",
      articles: [],
      comments: [],
      onePost: [],
      showArticle: true,
      showAddArticle: false,
      showPost: false,
      showEdit: false,
      storyPayload: null
    };
  },
  created() {
    this.getData();
  },
  components: {
    NavBar,
    SideBar,
    Content,
    Footer
  },
  methods: {
    getToken(data) {
      console.log(data);
      this.token = data.access_token;
      localStorage.setItem("token", data.access_token);
      this.getArticle();
    },
    getData() {
      instance
        .get("/articles", {})
        .then(({ data }) => {
          console.log(data, "disini");
          this.articles = data;
          console.log(this.articles);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    signOut() {
      this.token = "";
      this.articles = [];
      this.onePost = [];
      localStorage.removeItem("token");
    },
    getOne(id) {
      instance
        .get(`/articles/${id}`, {})
        .then(({ data }) => {
          this.onePost = data;
          console.log(this.onePost, "disini");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getWrite() {
      this.showArticle = false;
      this.showAddArticle = true;
      this.showPost = false;
      this.showEdit = false;
    },
    getArticle() {
      this.showArticle = true;
      this.showAddArticle = false;
      this.showPost = false;
      this.showEdit = false;
      this.getData();
    },
    getPost(id) {
      this.showArticle = false;
      this.showAddArticle = false;
      this.showPost = true;
      this.showEdit = false;
      this.getOne(id);
    },
    getEdit(id) {
      console.log(id, "");
      this.showArticle = false;
      this.showAddArticle = false;
      this.showPost = false;
      this.showEdit = true;
    }
  }
};
</script>

<style scoped>
</style>