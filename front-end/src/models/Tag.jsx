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

    type: Joi.string()
    .min(1) // Não aceira negativo
    .max(1)
    .required()
    .messages({'*': 'O tipo deve ser informado (entre 2 e 8 caracteres)'})

})
.options({allowUnknown: true})

export default Tag