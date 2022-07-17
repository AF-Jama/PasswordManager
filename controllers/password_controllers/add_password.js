const Cryptr = require('cryptr')
const db = require('../../models')

const addPassword = async (req,res)=>{
    console.log("START")
    const {siteName,Password} = req.body
    const masterPassword = req.cookies.master_password
    const cryptr = new Cryptr(req.cookies.master_password) // sets encryption key

    const encryptedString = cryptr.encrypt(Password) // encrypts raw password
    console.log(`Encrypted key is ${encryptedString}`)
    try {
        // want to get id of master password being used 
        let data = await db.masterTable.findOne({where:{master_password:masterPassword}})
        console.log("HERE 1")
        if(!data) throw new Error // triggered if no data entity is returned
        console.log("HERE 2")
        const masterPasswordId = data.mid // gets master password id 
        data = await db.passwordTable.findOne({where:{masterId:masterPasswordId,site:siteName}}) 
        console.log("HERE 3")
        if (data) throw new Error // entity exists then user already has a password for this site
        // else no data exists for this site and password can be commited
        await db.passwordTable.create({site:siteName,masterId:masterPasswordId,encrypt_password:encryptedString}) // commits to password table
        console.log("HERE 4")
        res.status(200)
        return res.json({
            msg:"Succesfully logged in"
        })
    } catch (error) {
        res.status(300)
        res.json({
            msg:"UNSUCCESFUL"
        })
    }
}


module.exports = {
    addPassword
}