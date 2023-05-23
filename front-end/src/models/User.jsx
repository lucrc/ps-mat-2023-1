import Joi from 'joi'



const User = Joi.object({

    name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({'*': 'O nome é obrigatório (entre 2 e 100 caracteres)'}),

    email: Joi.string()
    .min(2) // Não aceira negativo
    .max(100)
    .required()
    .messages({'*': 'O e-mail deve ser informado (entre 2 e 100 caracteres)'}),

    verified_email: Joi.boolean()
    .required()
    .messages({'*': 'A verificação do e-mail dever ser feita'}),

    is_admin: Joi.boolean()
    .required()
    .messages({'*': 'A verificação do e-mail dever ser feita'}),

    phone: Joi.string()
    .min(2) // Não aceira negativo
    .max(20)
    .required()
    .messages({'*': 'O telefone deve ser informado (entre 2 e 20 caracteres)'}),

    password: Joi.string()
    .min(2) // Não aceira negativo
    .max(200)
    .required()
    .messages({'*': 'O password deve ser informado (entre 2 e 200 caracteres)'}),

})
.options({allowUnknown: true})

export default User