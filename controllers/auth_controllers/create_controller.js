const db = require('../../models')
const { hash } = require('bcrypt')
const saltRounds = 10

const createAccount = async (req,res,next)=>{
    console.log(req.body)
    console.log("Create account")
    const {name,username,email,masterPassword} = req.body  // destrucrures request payload
    const hash_password = await hash(masterPassword,saltRounds) // hashing of master password plain text
    const hour =  3600000
    try {
        console.log("Create controller hit")
        await db.userTable.create({name:name,username:username,email:email}).then(user=>db.masterTable.create({userId:user.id,master_password:hash_password}))
        // await t.commit() // commits trasaction after succesful creation

        res.cookie('new_user',true,{
            expires: new Date(Date.now()+(hour*24*62))
        })// creates new user identifier cookie, required for possible targeted ads to new users in the first month

        return res.status(201).send({
            msg:"Succesfully created account, redirect to login page"
        })
    } catch (error) {
        console.log(error)
        error.status = 900
        error.message = "Account already exists"
        next(error)        
    }
}


module.exports = {
    createAccount
}