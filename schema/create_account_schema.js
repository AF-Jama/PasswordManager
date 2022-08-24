const Joi = require('joi') 
require('dotenv').config()

// create user/account schema, checks  for type and also regex pattern 
const createUserSchema  = Joi.object({
    name:Joi.string().required(),
    username:Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9_.!-]{3,20}$')),
    email:Joi.string().required().pattern(new RegExp('[A-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}')),
    masterPassword:Joi.string().required().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$'))
})




module.exports = {
    createUserSchema
}