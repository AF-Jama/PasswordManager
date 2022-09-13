const db = require('../../models')
const path = require('path')

const getUserPasswords = async (req,res,next)=>{
    const masterPassword = req.cookies['master_password']
    const username = req.cookies['username']
    console.log(username)
    console.log(masterPassword)

    // get all passwords 
    const user = await db.userTable.findOne({where:{username:username}})
    let masterPassId = await db.masterTable.findOne({where:{userId:user.id}}) // get password entity using user id , 1:1 relationship
    masterPassId = masterPassId.mid // gets master password id which is used in the passwords table due to the 1:m relationship 

    // now to get all passwords stored
    const storedPasswords = await db.passwordTable.findAll({where:{masterId:masterPassId}}) // gets all stored passwords in array
    console.log("OVERE HERWE11")
    // return res.sendFile(path.resolve(__dirname + '../../../views/main_page'))
    return res.render(path.resolve(__dirname + '../../../views/mains'),{  
        data:storedPasswords 
    })
    

}












module.exports = {
    getUserPasswords
};

