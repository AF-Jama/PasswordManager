const express = require('express')
const {addPassword,editPassword,deleteAllPasswords} = require('../controllers/auth_controllers/password_actions_controller.js')  
const {addPasswordSchema,editPasswordSchema} = require('../schema/add_password_schema.js')
const validator = require('express-joi-validation').createValidator({})

const router = express.Router()


router.post('/add',validator.body(addPasswordSchema),addPassword)
router.post('/edit',validator.body(addPasswordSchema),editPassword)

router.delete('/delete/all',deleteAllPasswords)

// router.post('/delete')







module.exports = router