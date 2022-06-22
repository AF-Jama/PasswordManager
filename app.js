const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./models') // imports 

const cookieParser = require('cookie-parser')

// middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json()) // to parse incoming json payload
app.use(cookieParser()) // cookie parser middleware


app.use('/auth',require('./routes/authorisation.js'))


// base route -> which points login page when NOT logged in and redirects to password manager main page when user is logged  
app.get('/',(req,res)=>{
    res.send({msg:"Password manager"})
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

db.sequelize.sync().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Listening on port ${process.env.PORT}`)
    })    
})

