<template>
  <div class="card-body">
    <form method="post" v-on:submit.prevent="editPost">
       <div class="clearfix" v-if="loading">
        <b-spinner class="d-flex justify-content-center mb-3" label="Floated Right"></b-spinner>
      </div>
      <div class="form-group">
        <label for="formGroupExampleInput">Your Article Titleeeee</label>
        <input
          type="text"
          v-model="onePost.title"
          class="form-control"
          aria-describedby="title"
          placeholder="Enter your title"
        />
        <small id="text-information" class="form-text text-muted">
          Make your title
          excited!.
        </small>
      </div>
      <div class="form-group">
        <label for="img">Edit your photo</label>
        <div style="width:231px">
        <img :src="imageLinkFromGCS" class="rounded float-left img-fluid" alt="image">
        </div>
        <b-form-file
          @change="onFilePicked"
          v-model="file"
          :state="Boolean(file)"
          placeholder="Choose a file..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
      </div>
      <div class="form-group">
        <label>create your wonderful article here!</label>
        <tinymce-editor
          v-model="onePost.content"
          api-key="x3sojlqrnmbc6ad5465jt7utexbpvdvc3tjgamy2547nf38a"
          :init="{plugins: 'wordcount'}"
        ></tinymce-editor>

        <!-- <textarea ></textarea> -->
      </div>
      <button type="submit" @click="handlerAfterEdit()" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
var instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers : {
    token : localStorage.getItem("token")
  }
});
export default {
  components: {
    "tinymce-editor": Editor // <- Important part
  },
   data() {
    return {
      loading:false,
      newImg: "",
      newTitle: "",
      newStory: "",
      loading: "",
      imageUrl:"",
      imageName:"",
      imageFile:"",
      imageLinkFromGCS:this.onePost.image,
      file:""
    };
  },
  props: ["onePost", "token"],
  methods: {
    onFilePicked(e) {
      this.loading = true;
      this.imageUrl = "";
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageFile = files[0]; // this is an image file that can be sent to server...
          const formData = new FormData();
          formData.append("image", this.imageFile);
          instance
            .post(`/articles/upload`, formData)
            .then(({ data }) => {
              console.log(data)
              this.loading = false;
              this.imageUrl = fr.result;
              this.imageLinkFromGCS = data.link;
            })
            .catch(err => {
              console.log(err.data);
            });
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    editPost() {
      instance
        .put(`/articles/${this.onePost._id}`, {
          title: this.onePost.title,
          content: this.onePost.content,
          image: this.imageLinkFromGCS
        })
        .then(({ data }) => {
          this.$emit("show-post", this.onePost_id);
          Swal.fire({
            type:'success',
            text:'success edit post'
          })
        })
        .catch(function(err) {
          console.log(err.response);
          Swal.fire({
            type:'error',
            text:'not authorize'
          })
          //  this.$swal('Hello Vue world!!!');
        });
    }
  }
};
</script>

<style>
</style>
