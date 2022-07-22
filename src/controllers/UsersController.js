const AppError = require('../utils/AppError')

const sqliteConnection = require('../database/sqlite');
const UserRepository = require('../repositories/UserRepository');
const UserCreateService = require('../services/UserCreateService');
//this code handles altering the database and providing the client with a response
class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body


    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);
    await userCreateService.execute( {email,name ,password} );

    return response.status(201).json()

    // if (!name) {
    //   throw new appError('name é obrigatorio')
    // }

    // response.status(201).json({ name, email, password })
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body
    // const { id } = request.params /////this line is not needed anymore because auth middleware is handling this
    const user_id = request.user.id;
    
    const database = await sqliteConnection();
    const user = await database.get('SELECT * FROM users WHERE  id = (?)', [user_id])

    if (!user) {
      throw new AppError('usuario não encontrado')
    }

    const userWithUpdatedEmail = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )
    // this works because you need to check the id(avoid a null value) and then compare with user id to make sure the new email is not being used by another user 
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new appError('este email ja esta em uso')
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if (password && !old_password) {
      // porque esta linha de codigo taca um response diferente???
      throw new appError(
        'voce precisa informar a senha antiga para definir a nova senha'
      )
    }
    if (password && old_password) {
      const checkOldPassword = old_password !== user.password

      if (checkOldPassword) {
        throw new appError('a senha antiga não confere')
      }

      user.password = password
    }

    await database.run(
      `
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    )

    return response.json()
    //poe virgula depois do () no now no updated at pra quebrar a pohha toda lul
  }
}

module.exports = UsersController
