const AppError = require("../utils/AppError");

class UserCreateService{
  constructor(userRepository){
    this.userRepository = userRepository
  }

  async execute({name,email,password}){

    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('este email ja esta em uso')
    }

    const userCreated = await this.userRepository.create({name, email, password});

    return userCreated;
  }
}

module.exports = UserCreateService