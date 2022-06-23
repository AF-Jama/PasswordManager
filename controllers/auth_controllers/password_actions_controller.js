const Cryptr = require('cryptr');
const db = require('../../models')

const addPassword = async (req,res,next)=>{
    const {siteName,password} = req.body // destructures post payload
    try {
        const masterPassword = req.cookies.master_password // gets user master password that will act as their unique encryption/decryption key for their password
        const masterPasswordRow = await db.masterTable.findOne({where:{master_password:masterPassword}}) // gets specific master password row which contains id which will be used as a foreign key in the password table to link to the master password that is used as encryption key
        console.log("HERE 1")
        const masterPasswordId = masterPasswordRow.mid // returns master password primary key id which will be the foreign key in the password table
        const cryptr = new Cryptr(masterPassword); // creates encryption key
        console.log("HERE 2")
        const encrptedPassword = cryptr.encrypt(password) // encrypts password using master password hash as encryption key
        // check if site password already exists with a specific master key, if so, then throw an error saying password for this site already exists to change this use the edit password function
        const doesPasswordExistForThisSite = await db.passwordTable.findOne({where:{site:siteName,masterId:masterPasswordId }}) 
        console.log("HERE 3")
        if (doesPasswordExistForThisSite) throw new Error("Password already exists for this site and hence cannot add. To edit password then use the edit button")
        await db.passwordTable.create({site:siteName,encrypt_password:encrptedPassword,masterId:masterPasswordId})
        // then want to add into password database

        return res.send({
            msg:"Succesuflly added password"
        })
    } catch (error) {
        return res.send({
            err:"Could not add password as password for this site already exists"||error
        })
    }
}



// const deletePassword = async (req,res,next)=>{

// }

// const a = async ()=>{
//     let masterPassword = ''
//     const doesPasswordExistForThisSite = await db.passwordTable.findOne({where:{site:"Google",masterId:1 }}) 
//     if(!doesPasswordExistForThisSite){
//         console.log("Does not exist")
//     }
//     else{
//         console.log("Does exist")
//     }
// }

// a()

module.exports = {
    addPassword
}