const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is empty"]
    },
    content: {
        type: String,
        required: [true, "content is empty"]
    },
    image : {
        type: String,
        required: [true, "image is empty"]
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {timestamps: true})


module.exports = mongoose.model("article", articleSchema)