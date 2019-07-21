<template>
    <div class="sidebar">
                <a v-bind:class="{ active: !showAddArticle }" @click="getArticle()" href="#home">Articles</a>
                <a class="post" v-bind:class="{ active: showAddArticle }" @click="getWrite()" href="#posts"> Posts</a>
                <a href="#contact">Contact</a>
                <a href="#about">About</a>
            </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods : {
    getWrite(){
        this.$emit("getWrite")
    },
    getArticle(){
        this.$emit("getArticle")
    }
  },
  props: ["showAddArticle"]
};
</script>

<style scoped>
</style>
