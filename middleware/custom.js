const validateEmail = (email)=>{
    let re = /\S+@\S+\.\S+/;
    if(!re.test(email)) throw new Error('Invalid email address') // triggered error when email is valid against the regex 
}

// email validation middleware 
const emailMiddleware = (req,res,next)=>{
try {
    validateEmail(req.body.email)
    next()
} catch (error) { 
    next(error) // triggers middleware    
}
}

// validateEmail("")

const validatePassword = (password)=>{
let re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,30}$/; // regex expression must be 8-30 charecters
if(!re.test(password)) throw new Error('Invalid password')
}

// password middleware 
const passwordMiddleware = (req,res,next)=>{
try {
    validatePassword(req.body.password)
    next() // triggers next middleware
} catch (error) {
    next(error)
}
}

const validateUsername = (username)=>{
let re = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/
if(!re.test(username)) throw new Error('Invalid username')
}

const usernameMiddleware = (req,res,next)=>{
try {
    validateUsername(req.body.username)
    next()
} catch (error) {
    next(error)
}
}


module.exports = {
emailMiddleware,
passwordMiddleware,
usernameMiddleware
}