const { Router } = require("express")

const userRoutes = require("./post.routes")
const notesRoutes = require("./notes.routes")
const tagsRoutes = require("./tags.routes")
const sessionsRouter = require("./sessions.routes")

const routes = Router()

routes.use("/post",userRoutes)
routes.use("/movie_notes",notesRoutes)
routes.use("/tags",tagsRoutes)
routes.use("/sessions", sessionsRouter)

module.exports = routes;