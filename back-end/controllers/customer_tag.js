//Importar o model correspondente ao controller
const { ConnectionTimedOutError } = require('sequelize')
const { CustomerTag, Customer, Tag} = require('../models')

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
        await CustomerTag.create(req.body)
        //HTTP 201: Created
        res.status(201).end()
    }
    catch(error){
        console.error(error)
    }
}

controller.retrieve = async(req, res) => {
    try{
        const data = await CustomerTag.findAll({
            include: [
                {model: Customer, as: 'customer'},
                {model: Tag, as: 'tag'}
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
        const data = await CustomerTag.findByPk(req.params.id)
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
        const response = await CustomerTag.update(
            req.body,
            {where: {id: req.params.id}}
        )

        //response retorna um vetor. O primeiro elemento
        //do vetor indica quantos registros foram afetados
        // pelo update
        if(response[0] > 0){
            //HTTP 204: No Content
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
    const response = await CustomerTag.destroy(
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
module.exports = controller