const express = require("express")
const router = express.Router()
const userRouter = require("./user-route")
const articleRouter = require("./article-route")


router.use("/users", userRouter)
router.use("/articles", articleRouter)

module.exports = router
