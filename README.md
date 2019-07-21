# mini-wp

#### MINI-WP built Express and Monggose in server.

### User

Routes | HTTP | Body | Description
------ | ---- | ---- | -----------
/api/users/signup | POST | username:String, email:String, password:String | Register new user
/api/users/signin | POST | username:String,password:String | Logging in user
/api/users/signin/google | POST | google account | Logging in user with google account
/api/users/confirmaton/:token | GET | token and email user | Confirmation email verification


### Article

Routes | HTTP | Body | Description | Middlewares
------ | ----- | ----- | -------- | ---
/api/articles | GET | none | Show the articles | login authentification
/api/articles/:id | GET | none | Get a single article info | Login Authentication
/api/articles | POST | title:String, content:String image:String| Create new article | Login Authenthication
/api/articles/:id | DELETE | none | Delete by id |  Login Authentication & Authorization by owner only
/api/articles/:id | PUT | input new updated data | Edit your list (will change the whole data) |  Login Authentication & Authorization by owner only
/api/articles/:id | PATCH | input new updated data | Edit your list (only change the updated key) |  Login Authentication & Authorization by owner only
/api/upload | PATCH | upload image to google cloud | image form data |  Login Authentication

## Usage
 Make sure you have Node.js and npm installed in your computer, and then run these commands:
 ```
 $ npm install
 $ nodemon app.js
 ```

 Access the API via https://localhost:3000/api

