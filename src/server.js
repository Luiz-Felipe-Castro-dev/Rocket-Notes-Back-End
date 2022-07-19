require("dotenv/config");
require('express-async-errors');

const migrationsRun = require("./database/sqlite/migrations")
const AppError = require('./utils/AppError');
const uploadConfig = require('./configs/upload')

const cors = require("cors");
const express = require('express')
const routes = require('./routes')

migrationsRun();

const app = express()
app.use(cors())
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)
//this code is where everything connects.


app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.error(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})
//this needs to be moved onto routes, which redirects to controller
app.get('/message/:id/:users', (request, response) => {
  const { id, users } = request.params

  response.send(`
  id da mensagem é o : ${id}
   para o usuario: ${users}`)
})
//this needs to be moved onto routes, which redirects to controller
app.get('/users', (request, response) => {
  const { number, username } = request.query
  response.send(`o numero é o ${number} e o username é ${username}`)
})

const PORT = process.env.PORT;
//this tells you through the terminal which port the server is in and confirms the server is up
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
