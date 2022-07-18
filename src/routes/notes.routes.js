const {Router} = require("express");

const notesRoutes = Router()
const ensureAuthenticated = require("../Middlewares/ensureAuthenticated")


function MiddleWare(request,response,next){
next();
}

const NotesController = require("../controllers/NotesController")

const notesController = new NotesController();

// this applies to all routes below
notesRoutes.use(ensureAuthenticated)

notesRoutes.get("/", notesController.index)

notesRoutes.post("/" ,MiddleWare, notesController.create)

notesRoutes.get("/:id", notesController.show)

notesRoutes.delete("/:id", notesController.delete)


module.exports = notesRoutes