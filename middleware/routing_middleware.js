// middleware to check if the request has the correct authurisation such as is logged in, has master password and username stored
const authChecker = (req,res,next) =>{
    if (!req.cookies.hasOwnProperty('logged_in') || !req.cookies.hasOwnProperty('master_password')){
        return res.redirect('/login')
    } // if not logged in or request doesnt have master password stored then user is redirected to the login endpoint
    next()
}











module.exports = {
    authChecker
}
