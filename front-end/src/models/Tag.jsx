import Joi from 'joi'



const Tag = Joi.object({

    description: Joi.string()
    .min(2)
    .max(30)
    .required()
    .messages({'*': 'A descrição é obrigatória (entre 2 e 30 caracteres)'}),

    color: Joi.string()
    .min(2) // Não aceira negativo
    .max(8)
    .required()
    .messages({'*': 'A cor deve ser informada (entre 2 e 8 caracteres)'}),

    type: Joi.any()
    .valid('C','O')    
    .required()
    .messages({'*': 'O tipo deve ser informado (entre "C" ou "O" em maiúsculo)'})

})
.options({allowUnknown: true})

export default Tag