<template>
  <div class="card-body">
    <form method="post" v-on:submit.prevent="addPost">
      <div class="clearfix" v-if="loading">
        <b-spinner class="d-flex justify-content-center mb-3" label="Floated Right"></b-spinner>
      </div>
      <div class="form-group">
        <label for="formGroupExampleInput">Your Article Title</label>
        <input
          type="text"
          v-model="newTitle"
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
        <label for="exampleFormControlFile1">upload image</label>
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
        <label>create your wonderful story here!</label>
        <tinymce-editor
          v-model="newStory"
          api-key="x3sojlqrnmbc6ad5465jt7utexbpvdvc3tjgamy2547nf38a"
          :init="{plugins: 'wordcount'}"
        ></tinymce-editor>

        <!-- <textarea ></textarea> -->
      </div>
      <button type="submit" v-on:click="add=false" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
var instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    token: localStorage.getItem("token")
  }
});
export default {
  data() {
    return {
      newImg: "",
      newTitle: "",
      newStory: "",
      loading: "",
      imageUrl: "",
      imageName: "",
      imageFile: "",
      imageLinkFromGCS: "",
      file: "",
      loading: false
    };
  },
  components: {
    "tinymce-editor": Editor // <- Important part
  },
  props: [["token"]],
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
              console.log(data);
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

    addPost() {
      console.log(this.imageUrl);
      instance
        .post("/articles", {
          title: this.newTitle,
          content: this.newStory,
          image: this.imageLinkFromGCS
        })
        .then(({ data }) => {
          console.log(data);
          this.$emit("getArticle");
          Swal.fire({
            type:'success',
            text:'success add article'
          })
        })
        .catch(function(error) {
          console.log(error.response);
        });
      this.newTitle = "";
      this.newTime = "";
      this.newImg = "";
      this.newStory = "";
    }
  }
};
</script>

<style>
</style>
