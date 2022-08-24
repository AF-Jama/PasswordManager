

const logoutController = (req,res,next)=>{
    // to logout 'logged_in' cookie varible must be removed
    try{
        res.clearCookie('logged_in')
        res.clearCookie('username')
        res.clearCookie('master_password') // clears master cookie
        return res.redirect('/login')
        return res.status(200).send({
            msg:"Succesfully logged out"
        }).redirect('/login')
    }catch(error){
        return res.redirect('/mainpage')
        error.message = "Error when trying to logout"
        next(error) // triggers error middleware handler  
    }
}


module.exports = {
    logoutController
}