const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const csurf = require('csurf')
const path = require('path')
const db = require('./models') // imports 

const cookieParser = require('cookie-parser')

// middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json()) // to parse incoming json payload
app.use(cookieParser()) // cookie parser middleware
app.use(cors())



// app.get('/login') // login page endpoint
// app.get('/mainpage') // main page endpoint containing each user password in a card
// app.get('/mainpage/edit') // edit page
// app.get('/mainpage/delete') // delete page
// app.get('/logout')

app.use('/auth',require('./routes/authorisation.js')) // auth endpoint
app.use('/actions',require('./routes/actions.js')) // actions endpoint


// base route -> which points login page when NOT logged in and redirects to password manager main page when user is logged  
app.get('/',(req,res)=>{
    res.json({msg:"Password manager"})
})

app.get('/create',(req,res)=>{
    res.sendFile(__dirname + '/public/templates/create_account.html')
}) // create endpoint which renders create account page

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
    app.listen(process.env.PORT,()=>{
        console.log(`Listening on port ${process.env.PORT}`)
    })    
})