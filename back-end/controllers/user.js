//Importar o model correspondente ao controller
const { ConnectionTimedOutError } = require('sequelize')
const { User, OrderStatus, Order} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const controller = {} // objeto vazio 

/*
    Métodos CRUD do controller
    create: cria um novo registro
    retrieve: lista (recupera) todos os registros
    retrieveOne: lista (recupera) apenas um registro 
    update: atualiza um registro
    delete: exclui um registro
*/

controller.create = async(req, res) => {
    try{

        //Criptografar a senha
        req.body.password = await bcrypt.hash(req.body.password, 12)

        await User.create(req.body)
        //HTTP 201: Created
        res.status(201).end()
    }
    catch(error){
        console.error(error)
    }
}

controller.retrieve = async(req, res) => {
    try{
        const data = await User.findAll({
            include:[       
            {model: OrderStatus, as: 'order_statuses'},
            {model: Order, as: 'orders'}
            ]
        })
        //HTTP 200: OK (implícito)
        res.send(data)

    }
    catch(error){
        console.error(error)
    }
}
controller.retrieveOne = async(req, res) => {
    try{
        const data = await User.findByPk(req.params.id)
        //HTTP 200: OK (implícito)
        if (data) res.send(data)
        
        //HTTP 404: Not Found
        else res.status(404).end()

    }
    catch(error){
        console.error(error)
    }
}
controller.update = async (req, res) => {
    try{
        
        // Se houver sido passado o campo "password",
        // criptografa a senha
        
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 12)
        }
        const response = await User.update(
            req.body,
            {where: {id: req.params.id}}
        )

        //response retorna um vetor. O primeiro elemento
        //do vetor indica quantos registros foram afetados
        // pelo update
        if(response[0] > 0){
            // HTTP 204: No Content
            res.status(204).end()
            }
            else { //Não encontrou o registro para atualizar
                //HTTP 404: Not found
                res.status(404).end()

            }
        }
        catch(error){
            console.error(error)
        }
    }
 
controller.delete = async(req, res) => {
   try{
    const response = await User.destroy(
        {where: {id:req.params.id} }
    )
    if(response){ // Encontrou e excluiu
        //HTTP 204: No content
        res.status(204).end()

    }
    else {      //Não encontrou e não excluiu
        //HTTP 404: Not found
        res.req.status(404).end()
        
    }
   }
   catch(error){
    console.error(error)
   }
}

controller.login = async (req, res) =>{
    try {
        const user = await User.scope('withPassword').findOne({ where: {email: req.body.email}})

        //Usuário não encontrado ~> HTTP 401: Unauthorized
        if(!user) return res.status(401).end()

            const pwMatches = await bcrypt.compare(req.body.password, user.password)
            if (pwMatches){
            // A senha confere
            const token = jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email,
                verified_email: user.verified_email,
                is_admin: user.is_admin,
                phone: user.phone
            },
            
            process.env.TOKEN_SECRET,       //Chave para criptografar o token
            { expiresIn: '24h'}             //Duração do token
            )

            //Retorna o token ~> HTTP 200: OK (implícito)
            //res.json({auth: true, token})
            res.cookie('AUTH', token,{
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                path: '/',
                maxAge: 24*60*60 // 24 horas
            })
            res.json({auth:true})
        }
        else{
            //Senha errada ~> HTTP 401: Unauthorized
            res.status(401).end()
        }
    }
    catch(error){
        console.error(error)
    }
}
controller.logout =  (req, res) => {
    res.clearCookie('AUTH') // APAGA O COOKIE
    res.json({auth:false})
    
}
module.exports = controller