const Joi = require('joi')


const loginSchema = Joi.object({
    username:Joi.string().required(),
    masterPassword:Joi.string().required()
})










module.exports = {
    loginSchema
}