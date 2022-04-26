const {Router} = require("express")
const {createFood, getMenu} =require("../controllers/foodController")
const {protect, admin}= require("../middlewares/authMiddleware")


const router =Router()

router.route("/food").post(protect, createFood, admin).get(protect, getMenu)


module.exports=router