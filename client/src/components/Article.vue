<template>
  <div class="d-flex">
    <div class="mr-auto p-2">
      <blockquote class="blockquote mb-0">
        <p style="cursor: pointer" @click="getPost(id)">{{ title }}</p>
        <footer
          style="cursor: pointer"
          @click="getPost(id)"
          class="blockquote-footer"
        >{{ getAgo(updated_at) }} by {{ username.username }}</footer>
      </blockquote>
    </div>
    <div class="p-2" @click="getPost(id)">
      <img
        :src="image"
        width="88"
        height="80"
        style="cursor: pointer"
        class="d-inline-block align-top img-fluid"
        alt="belum ada image"
      />
    </div>
    
    <div class="p-2">
      <button @click="getPost(id)" class="btn">
        <i class="fa fa-ellipsis-h"></i>
      </button>
    </div>
  </div>

</template>

<script>
import moment from 'moment'
export default {
    props: ["id", "title", "content", "created_at","updated_at","image","username"],
    methods : {
      getPost(id){
        this.$emit("show-post",id)
      },
      getAgo(date){
          console.log(this.username)
            return moment(date).fromNow();
      },
    }
};
</script>

<style>
</style>
