const { verify } = require("jsonwebtoken");

const AppError = require("../utils/AppError")

const authConfig = require("../configs/auth")

function ensureAuthenticated(request,response,next){
  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new AppError("JWT token não informado", 401)
  }
// aqui voce esta separando o auth header em duas partes, a primeira foda-se, mas a segunda é o token. o espaço que ta separando elas
  const [, token] = authHeader.split(" ");
// aqui o sub esta sendo desestruturado do resultado do verify sendo aplicado ao token comparando com a palavra passe do server, e esse sub agr vai ser chamado de user_id. deste sub sai o user_id do usuario para o servidor saber não só que o usuario existe mas tb qual seu id.
  try{
    const { sub:user_id} = verify(token, authConfig.jwt.secret)

    request.user = {
      id: Number(user_id),
    };
// aqui,  a proxima função é chamada pq o usuario passou pelo teste de segurança do middleware
    return next()
  } catch{
    throw new AppError("JWT token invalido", 401);
  }
}

module.exports = ensureAuthenticated