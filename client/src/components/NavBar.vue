<template>
  <nav class="fixed-top navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/9/93/Wordpress_Blue_logo.png"
        width="30"
        height="30"
        class="d-inline-block align-top"
        alt
      />
      WordPress
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <!-- <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> -->
          <a href="#" class="nav-link">
            <i class="fa fa-fw fas fa-book"></i> Header
            <span class="sr-only">(current)</span>
          </a>
        </li>
      </ul>
    </div>
    <!-- <div class=""><a href="#"><i class="fa fa-fw fa-envelope"></i> Header</a> </div> -->

    <div class>
      <button
        class="ujung btn btn-outline-dark my-2 my-sm-0"
        type="button"
        v-if="token"
        v-on:click.prevent="getWrite()"
      >
        <i class="fa fa-edit"></i> Write
      </button>
      <button
        class="ujung btn btn-outline-dark my-2 my-sm-0"
        type="button"
        v-on:click.prevent="googleSignIn()"
        v-if="!token"
      >
        <i class="fa fa-google"></i> google
      </button>
      <b-button v-if="!token" class="ujung" variant="outline-dark" v-b-modal.modal-1>
        <i class="fa fa-sign-in"></i> Sign In
      </b-button>
      <b-button v-if="!token" class="ujung" variant="outline-dark" v-b-modal.modal-2>
        <i class="fa fa-user-plus"></i> Register
      </b-button>
      <button
        class="ujung btn btn-outline-dark my-2 my-sm-0"
        type="button"
        v-on:click.prevent="signOut()"
        v-if="token"
      >
        <i class="fa fa-google"></i> out of here
      </button>
      <img
        class="ujung profile-picture"
        src="https://cdn1.iconfinder.com/data/icons/social-messaging-productivity-1-1/128/gender-male2-512.png"
        alt="Cinque Terre"
      />
      <button class="ujung btn my-2 my-sm-0">
        <i class="fa fa-bell"></i>
      </button>
    </div>
    <b-modal ref="modal-2" id="modal-2" title="Register">
      <form method="post" v-on:submit.prevent="register">
        <div class="form-group">
          <label for="formGroupExampleInput">Username</label>
          <input
            type="text"
            v-model="username"
            class="form-control"
            aria-describedby="title"
            placeholder="Enter your username"
          />
          <small id="text-information" class="form-text text-muted">
            Make your username
            cool!.
          </small>
        </div>
        <div class="form-group">
          <label for="formGroupExampleInput">Email</label>
          <input
            type="email"
            v-model="email"
            class="form-control"
            aria-describedby="email"
            placeholder="Enter your email"
          />
          <small id="text-information" class="form-text text-muted">don't use same email!.</small>
        </div>
        <div class="form-group">
          <label for="formGroupExampleInput">Password</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            aria-describedby="password"
            placeholder="Enter your password"
          />
          <small id="text-information" class="form-text text-muted">I'll keep your secret!.</small>
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
    </b-modal>
    <b-modal ref="modal-1" id="modal-1" title="Sign In">
      <form method="post" v-on:submit.prevent="signIn">
        <div class="form-group">
          <label for="formGroupExampleInput">Username</label>
          <input
            type="text"
            v-model="username"
            class="form-control"
            aria-describedby="title"
            placeholder="Enter your username"
          />
        </div>
        <div class="form-group">
          <label for="formGroupExampleInput">Password</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            aria-describedby="password"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" class="btn btn-primary">Sign In</button>
      </form>
    </b-modal>
  </nav>
</template>

<script>
var instance = axios.create({
  baseURL: "http://localhost:3000/api/"
});

export default {
  data() {
    return {
      email: "",
      username: "",
      password: ""
    };
  },
  methods: {
    getWrite() {
      this.$emit("getWrite");
    },
    signIn() {
      instance
        .post("/users/signin", {
          username: this.username,
          password: this.password
        })
        .then(({ data }) => {
          this.$emit("get-token", data);
          localStorage.setItem("token", data.access_token);
          this.$refs["modal-1"].hide();
          Swal.fire({
            type: "success",
            text: "success login"
          });
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: "invalid password/username"
          });
          console.log(err);
        });
    },
    register() {
      instance
        .post("/users/signup", {
          email: this.email,
          username: this.username,
          password: this.password
        })
        .then(({ data }) => {
          this.$emit("get-token", data);
          localStorage.setItem("token", data.access_token);
          this.$refs["modal-2"].hide();
          Swal.fire({
            type: "success",
            text: "success register"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    googleSignIn() {
      this.$gAuth
        .signIn()
        .then(signedIn => {
          // On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
          let token = signedIn.getAuthResponse().id_token;
          console.log(token);
          instance
            .post("/users/signin/google", { token: token })
            .then(({ data }) => {
              console.log(data);
              localStorage.setItem("token", data.access_token);
              this.$emit("get-token", data);
              Swal.fire({
                type: "success",
                text: "success login"
              });
            })
            .catch(function(error) {
              console.log(error);
              Swal.fire({
                type: "error",
                text: "invalid password/username"
              });
            });
        })
        .catch(error => {
          //on fail do something
        });
    },
    signOut() {
      this.$emit("sign-out");
      Swal.fire({
        type: "success",
        text: "success sign-out"
      });
    }
  },
  props: ["token"]
};
</script>

<style>
</style>
