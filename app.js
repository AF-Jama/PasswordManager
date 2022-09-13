const express = require('express')
const app = express()
require('dotenv').config()
// const cors = require('cors')
// const csurf = require('csurf')
const {authChecker,generalRequestMiddleware,loggedInRequestMiddleware} = require('./middleware/routing_middleware.js')
const {getUserPasswords} = require('./controllers/password_controllers/get_passwords.js')
const {addPassword} = require('./controllers/password_controllers/add_password.js')
const path = require('path')
const db = require('./models') // imports 

const cookieParser = require('cookie-parser')
const { logoutController } = require('./controllers/auth_controllers/logout_controller.js')

// middleware
app.use(express.json()) // to parse incoming json payload
app.use(cookieParser()) // cookie parser middleware
// app.use(cors())
// app.use(express.urlencoded({extended:false}))
// // app.use(authChecker) // custom routing middleware
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')




app.use('/auth',require('./routes/authorisation.js')) // auth endpoint
app.use('/actions',require('./routes/actions.js')) // actions endpoint


// base route -> which points login page when NOT logged in and redirects to password manager main page when user is logged
app.get('/',loggedInRequestMiddleware,(req,res)=>{
    return res.sendFile(__dirname + '/public/templates/login.html');
})

app.get('/create',loggedInRequestMiddleware,(req,res)=>{
    console.log(typeof req.cookies)
    res.sendFile(__dirname + '/public/templates/create_account.html')
}) // create endpoint which renders create account page

app.get('/login',loggedInRequestMiddleware,(req,res)=>{
    res.sendFile(__dirname + '/public/templates/login.html')
})

app.get('/here',(req,res)=>{
    res.send({  
        msg:"Here endpoint"
    })
})

app.get('/users/exists',async (req,res)=>{
    const usernameQuery = req.query.username
    
    res.set('content-type', 'application/json');
    
    const user = await db.userTable.findOne({where:{username:usernameQuery}})
    
    if(!user) return res.json({
        "msg":false
    })
    return res.json({
        "msg":true
    })
})

app.get('/email/exists',async (req,res)=>{
    const emailQuery = req.query.email // gets url query 
    
    let email = await db.userTable.findOne({where:{email:emailQuery}}) // find entity that contains email with the email queury
    
    // if now email exist then json boolean is returned
    if(!email) return res.json({
        "msg":false
    })
    return res.json({
        "msg":true
    })
})

// app.get('/login') // login page endpoint
app.get('/mainpage', authChecker, getUserPasswords) 

// main page endpoint containing each user password in a card
// app.get('/mainpage/edit') // edit page
// app.get('/mainpage/delete') // delete page
app.post('/logout',logoutController) // logout post endpoint

app.get('/mainpage/add',authChecker,(req,res)=>{
    res.sendFile(__dirname + '/public/templates/add_password.html')
    // return res.redirect('www.google.com')
})
app.post('/mainpage/add',addPassword) // post endpoint to add password

app.get('/about',(req,res)=>{
    return res.sendFile(__dirname + '/public/templates/about_us.html')
})

app.get('/home',(req,res)=>{
    return res.sendFile(__dirname + '/public/templates/home.html')
})

// error handler middleware
app.use((err,req,res,next)=>{
    if(err){
        console.log(`Error handler middleware hit`)
        return res.json({
            error:err.status||400,
            msg:err.message
        })
    }
})


app.use(express.static(path.join(__dirname + '/public'))) // references public file in current directory

db.sequelize.sync().then(()=>{
    app.listen(process.env.PORT||5000,()=>{
        console.log(`Listening on port ${process.env.PORT}`)
    })
})




