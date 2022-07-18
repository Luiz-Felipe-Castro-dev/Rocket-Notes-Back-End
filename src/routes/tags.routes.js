const {Router} = require("express");

const tagsRoutes = Router()

const ensureAuthenticated = require("../Middlewares/ensureAuthenticated")

function MiddleWare(request,response,next){
next();
}

const TagsController = require("../controllers/TagsController")

const tagsController = new TagsController();

tagsRoutes.get("/", ensureAuthenticated, tagsController.index)


module.exports = tagsRoutes