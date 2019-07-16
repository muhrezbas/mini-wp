const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is empty"],
        unique: true
    },
    content: {
        type: String,
        required: [true, "content is empty"]
    },
}, {timestamps: true})


module.exports = mongoose.model("article", articleSchema)