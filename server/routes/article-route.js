const express = require("express")
const router = express.Router()
const articleController = require("../controllers/article-controller")
const images = require('../helpers/images')
const authenticate = require('../middlewares/authenticate')
const authorization = require('../middlewares/authorizations')
router.use(authenticate)
router.get("/category", articleController.findCategory)
router.get("/category/filter?", articleController.findByCategory)
router.post("/", articleController.create)
router.post('/upload',
  images.multer.single('image'), 
  images.sendUploadToGCS,
  (req, res) => {
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })
router.get("/",articleController.get)
router.get("/:id",articleController.getOne)
router.put("/:id",authorization,articleController.update)
router.delete("/:id",authorization,articleController.destroy)


module.exports = router