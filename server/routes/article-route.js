const express = require("express")
const router = express.Router()
const articleController = require("../controllers/article-controller")
router.get("/category", articleController.findCategory)
router.get("/category/filter?", articleController.findByCategory)
router.post("/", articleController.create)
router.get("/",articleController.get)
router.get("/:id",articleController.getOne)
router.put("/:id",articleController.update)
router.delete("/:id",articleController.destroy)


module.exports = router