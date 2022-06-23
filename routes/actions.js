const express = require('express')
const {addPassword} = require('../controllers/auth_controllers/password_actions_controller.js')  
const {addPasswordSchema} = require('../schema/add_password_schema.js')
const validator = require('express-joi-validation').createValidator({})

const router = express.Router()


router.post('/add',validator.body(addPasswordSchema),addPassword)

// router.post('/delete')







module.exports = router