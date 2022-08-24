const Cryptr = require('cryptr')
const db = require('../../models')

const addPassword = async (req,res)=>{
    console.log("START")
    const masterPassword = req.cookies.master_password
    console.log("MASTER PASSWORD FROM COOKIE IS: ",masterPassword)
    const {siteName,sitePassword} = req.body
    console.log(`Site name is ${siteName}`)
    console.log(`Site Password is ${sitePassword}`)
    const cryptr = new Cryptr(masterPassword) // sets encryption key

    const encryptedString = cryptr.encrypt(sitePassword) // encrypts raw password
    console.log(`Encrypted key is ${typeof encryptedString}`)
    try {
        console.log("Entered a try block")
        // want to get id of master password being used 
        let data = await db.masterTable.findOne({where:{master_password:masterPassword}})
        console.log("HERE 1")
        if(!data) throw new Error('No data entity exists') // triggered if no data entity is returned
        console.log("HERE 2")
        const masterPasswordId = data.mid // gets master password id 
        console.log(`Matser primary key ${masterPasswordId}`)
        data = await db.passwordTable.findOne({where:{masterId:masterPasswordId,site:siteName}}) 
        console.log("HERE 3")
        if (data) throw new Error('User already has password for this site') // entity exists then user already has a password for this site
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