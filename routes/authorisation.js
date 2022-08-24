const express = require('express')
const validator = require('express-joi-validation').createValidator({})

const router = express.Router()

const {createUserSchema} = require('../schema/create_account_schema') // payloads schemas
const {loginSchema} = require('../schema/login_schema.js')
const {emailMiddleware,passwordMiddleware,usernameMiddleware} = require('../middleware/custom.js')
const {createAccount} = require('../controllers/auth_controllers/create_controller.js') // create account controller
const {loginController} = require('../controllers/auth_controllers/login_controller.js')
const {logoutController} = require('../controllers/auth_controllers/logout_controller.js')
// const {loginController} = require('../controllers/login_controller.js')
// const {logoutController} = require('../controllers/logout.controller.js')


router.use((res,req,next)=>{
    console.log(`Authorisation endpoint hit`)
    next()
})

router.get('/',(req,res)=>{
    return res.send({
        status:`${res.status}`
    })
})

// validator.body(createUserSchema)

router.post('/create',createAccount)

router.post('/login',loginController)

router.post('/logout',logoutController) // checks if user is logged by checking cookie then logout accordingly





module.exports = router