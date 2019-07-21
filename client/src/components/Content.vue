<template>
  <!-- ============================= CONTENT =========================== -->
  <div class="content">
    <div class="card" style="margin-bottom: 40px">
      <div class="navbar card-header d-flex">
        <div class="mr-auto p-2 navbar navbar-light bg-light">
          <button type="button" style="background: #323C52;" class="btn btn-primary ujung">
            Published
            <span class="badge badge-light">4</span>
          </button>
          <button type="button" style="background: #323C52;" class="btn btn-primary ujung">
            Drafts
            <span class="badge badge-light">4</span>
          </button>
        </div>
        <div class="p-2">
          <div class="searchBox">
            <input class="searchInput" v-model="search" type="text" name placeholder="Search" />
            <button class="searchButton" href="#">
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      <div v-if="showArticle">
        <div class="hr"></div>
        <Article
          :token="token"
          v-on:show-post="getPost"
          :id="article._id"
          :title="article.title"
          :content="article.content"
          :created_at="article.createdAt"
          :updated_at="article.updatedAt"
          :username="article.author"
          :image="article.image"
          :key="index"
          v-for="(article,index) in filteredList"
        ></Article>
      </div>
      <div v-if="showAddArticle">
        <AddArticle :token="token" v-on:getArticle="getArticle"></AddArticle>
      </div>
      <div v-if="showPost">
        <Post :token="token" :onePost="onePost" v-on:getArticle="getArticle" v-on:show-edit="getEdit"></Post>
      </div>
      <div v-if="showEdit">
        <EditPost :token="token" v-on:show-post="getPost" :onePost="onePost"></EditPost>
      </div>
    </div>
  </div>
</template>

<script>
import Article from "./Article";
import AddArticle from "./addArticle";
import Post from "./Post";
import EditPost from "./EditPost";
export default {
  props: [
    "articles",
    "showArticle",
    "showAddArticle",
    "onePost",
    "showPost",
    "showEdit",
    "token"
  ],
  created() {
    console.log(this.token);
  },
  data() {
    return {
      search: ""
    };
  },
  methods: {
    getPost(id) {
      this.$emit("show-post", id);
    },
    getEdit(id) {
      console.log(id, "content");
      this.$emit("show-edit", id);
    },
    getArticle() {
      this.$emit("getArticle");
      console.log("halo");
    }
  },
  components: {
    Article,
    AddArticle,
    Post,
    EditPost
  },
  computed: {
    filteredList() {
      return this.articles.filter(article => {
        return article.title.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  }
};
</script>

<style>
</style>
