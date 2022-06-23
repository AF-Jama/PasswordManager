const Joi = require('joi')




const addPasswordSchema = Joi.object({
    siteName: Joi.string().required(),
    password:Joi.string().required().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$')),
})





module.exports = {
    addPasswordSchema
}