// middleware to check if the request has the correct authurisation such as is logged in, has master password and username stored
const authChecker = (req,res,next) =>{
    console.log(req.cookies['logged_in'])
    if (!req.cookies.logged_in || !req.cookies.master_password){
        return res.redirect('/login')
    } // if not logged in or request doesnt have master password stored then user is redirected to the login endpoint
    console.log("AUTH CHECKER PASSED")
    console.log(`Logged in is ${req.cookies.logged_in}`)
    console.log(`Master password  is ${req.cookies.master_password}`)
    next()
}

const generalRequestMiddleware = (req,res,next)=>{
    if (!req.cookies.hasOwnProperty('logged_in') || !req.cookies.hasOwnProperty('master_password')){
        return res.redirect('/login') // invalid request to page meaning redirected to login page
    }
    next() // represents a valid request 
}

// middleware to check the validity of a request
const loggedInRequestMiddleware = (req,res,next)=>{
    console.log("LOGGED IN MIDDLEWARE HIT")
    if (!req.cookies.logged_in || !req.cookies.master_password){
        return next()
    }
    console.log("REDIRECTED TO MAINPAGE")
    return res.redirect('/mainpage') // if valid then user is logged and redirected to mainpage

}










module.exports = {
    authChecker,
    generalRequestMiddleware,
    loggedInRequestMiddleware
}
