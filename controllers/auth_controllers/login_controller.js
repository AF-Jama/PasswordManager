const db = require('../../models')
const { hash, compare } = require('bcrypt')
const master = require('../../models/master')

//controller logic
const loginController = async (req,res,next) =>{
    const {username, masterPassword} = req.body // destructures request body
    try {
        console.log("Login controller hit")
        const user = await db.userTable.findOne({where:{username:username}})
        if (!user) throw new Error("User does not exist, please create account");
        const masterPass = await db.masterTable.findOne({where:{userId:user.id}})
        const passwordCompare = await compare(masterPassword,masterPass.master_password) // compares hash with plain text password
        console.log(`Master password is: ${masterPass.master_password}`)
        if(passwordCompare){
            var hour = 3600000
            res.cookie('logged_in',true,{
                expires: new Date(Date.now()+(hour*24*31)) // sets expiration date to one month to the future
            })
            res.cookie("username",username,{
                expires: new Date(Date.now()+(hour*24*31))
            })

            res.cookie('master_password',masterPass.master_password,{
                expires: new Date(Date.now()+(hour*24*31)) // sets expiration date to one month to the future
            }) // creates session

            res.status(200)
            return res.json({
                msg:"Succesfully logged in"
            })
        } 
        throw new Error("Wrong password"); // triggered if password and username are not matched and hence triggers error
    } catch (error) {
        res.status(300)
        res.json({
            msg:"UNSUCCESFUL"
        })
    }
}


// const a = async ()=>{
//     const masterPass = await db.masterTable.findOne({where:{userId:3}})
//     const comaprebool = await compare("",masterPass.master_password)
//     console.log(comaprebool)
// }


// a()

module.exports = {
    loginController
}