const {Router} = require("express");
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const ensureAuthenticated = require("../Middlewares/ensureAuthenticated")
const UsersController = require("../controllers/UsersController")
const UserAvatarController = require("../controllers/UserAvatarController")

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const userRoutes = Router()
const upload = multer(uploadConfig.MULTER)

// function MiddleWare(request,response,next){
// next();
// }
// middleware meramente demonstrativo
userRoutes.post("/" , usersController.create)

userRoutes.put("/",ensureAuthenticated ,usersController.update)

userRoutes.patch("/avatar", ensureAuthenticated , upload.single("avatar"), userAvatarController.update);

module.exports = userRoutes