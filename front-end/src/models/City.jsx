import Joi from 'joi'



const City = Joi.object({

    name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({'*': 'O nome é obrigatório (entre 2 e 30 caracteres)'}),
    state: Joi.string()
    .min(2)
    .max(2)
    .required()
    .messages({'*': 'O estado é obrigatório (com 2 caracteres)'})

    
})
//Permite campos não validados , como id, createdAt e updateAt
.options({allowUnknown: true})

export default City