if(process.env.NODE_ENV === "development") {
}
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const db = mongoose.connection;
const port = process.env.PORT || 3000

console.log(port)
const routes = require('./routes/index')


mongoose.connect('mongodb://localhost:27017/mini-wp', {useNewUrlParser: true, useCreateIndex: true});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to the database')
});

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use('/api', routes)

app.use((err, req, res, next) =>{
    console.log(err.message)
    if (err.code === 404) {
        res.status(404).json(err.message)
      } else if (err.code === 401) {
        res.status(401).json(err.message)
      } else if (err.code === 400) {
        res.status(400).json(err.message)
      } else if(err.name === 'MongoError' && err.code === 11000){
          var newerr = err.message.split(' ')
        res.status(400).json(`${newerr[7].split(' ')[0]} : ${newerr[12]} already exist`)
      } else if(err.name === 'ValidationError'){
        res.status(400).json(err.message)
      } else if(err.name === 'JsonWebTokenError'){
        res.status(400).json('Login First')
      } else {
        console.log(err);
        res.status(500).json(
          'Internal server error'
        );
      }
})  

app.listen(port, () => console.log(`Listening on port ${port}`))