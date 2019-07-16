const Article = require('../models/article')
class ControllerArticle {
    static create(req, res, next) {
        const {title,content} = req.body 
        let input = {title,content}
        // console.log(req.headers.decoded)
        // input.user = req.headers.decoded._id
        // console.log(input)
        
        // res.send(input)
        Article.create(input)
            .then((article) => {
                res.status(201).json(article)
            })
            .catch(next)
    }
    static get(req, res, next) {
        Article.find()
            .then((articles) => {
                res.status(200).json(articles)
            })
            .catch(next)
    }
    static getOne(req, res, next) {
        Article.findById(req.params.id)
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
    static findByCategory(req, res, next) {
        let value = req.query.category
        console.log(req.query)
        Article.find({category: value})
            .then((data) => {
                // res.send(data)
                res.json(data)
            })
            .catch(next)
    }
    static findCategory(req, res, next) {
        let value = Object.values(req.query)
        console.log(req.query)
        Article.find().distinct('category')
            .then((data) => {
                // res.send(data)
                res.json(data)
            })
            .catch(next)
    }
}
module.exports = ControllerArticle