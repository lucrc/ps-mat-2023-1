const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    //É necessário ter o token para continuas
    const bearerHeader = req.headers['authorization']

    // O token não foi passado ~> HTTP 403: Forbidden 
    if(!bearerHeader) return res.status(403).end()

    //Extrai o token de dentro do cabeçalho "authorization"
    let temp = bearerHeader.split(' ')
    const token = temp[1]

    //Validando o token
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {

        //Token inválido ou expirado ~HTTP 403: Forbidden
        if(error) return res.status(403).end()

        //Se chegamos até aqui, o token está OK e temos as inforções do
        //usuário logado no parâmetro "decoded". Vamos guardar isso na 
        //request para usar depois
        req.authUser = decoded
        
        console.log({authUser: req.authUser})
    


    console.log({bearerHeader})

    next()
    })
}