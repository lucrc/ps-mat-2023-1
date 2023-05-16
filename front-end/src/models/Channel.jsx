import Joi from 'joi'



const Channel = Joi.object({

    description: Joi.string()
    .min(2)
    .max(30)
    .required()
    .messages({'*': 'A descrição é obrigatória (entre 2 e 30 caracteres)'}),

    comission_fee: Joi.number()
    .min(0) // Não aceira negativo
    .max(100)
    .required()
    .messages({'*': 'A taxa de comissão deve ser informada (entre 0 e 100)'})

})

export default Channel