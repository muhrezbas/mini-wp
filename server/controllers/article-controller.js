const Article = require('../models/article')
const User = require('../models/user')
class ControllerArticle {
    static create(req, res, next) {
        const {title,content,image} = req.body 
        let input = {title,content,image}
        console.log(input.image)
        // console.log(req.headers.decoded)
        input.author = req.headers.decoded._id
        // console.log(input)
        
        // res.send(input)
        Article.create(input)
            .then((article) => {
                res.status(201).json(article)
            })
            .catch(next)
    }
    static get(req, res, next) {
        Article.find().populate('author')
            .then((articles) => {
                res.status(200).json(articles)
            })
            .catch(next)
    }
    static getOne(req, res, next) {
        Article.findById(req.params.id).populate('author')
            .then((article) => {
                res.status(200).json(article)
            })
            .catch(next)
    }
    static destroy(req, res, next) {
        Article.deleteOne({_id: req.params.id })
            .then((article) => {
                res.status(200).json({
                    message: `berhasil terdelete pada id ${req.params.id}`
                })
            })
            .catch(next)
    }
    static update(req, res, next) {
        Article.updateOne({_id: req.params.id },req.body,{ runValidators: true })
            .then((article) => {
                res.status(200).json(article)
            })
            .catch(next)
    }
    static updatePatch(req, res, next) {
        if((Object.values(req.body).length)<=1){
            Article.update({_id: req.params.id },req.body)
            .then((user) => {
                res.status(200).json(user)
            })
            .catch(next)
        } else {
            res.json({message : 'only one can edit with patch'})
        }
        
    }
}
module.exports = ControllerArticle