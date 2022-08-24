// Client side javascript 
// mod.cjs

// create account
const form = document.getElementById('create-account-form')
const names = document.getElementById('form-control-name')
const username = document.getElementById('form-control-username')
const email = document.getElementById('form-control-email')
const masterPassword = document.getElementById('form-control-masterPassword')
const button = document.getElementById('create-account-btn')
const xmlhttp = new XMLHttpRequest()

// form event listener on click event
form.addEventListener('submit', e=>{
    e.preventDefault() // prevents default value from occuring which clears the page and reloads
    // values of inputs 
    console.log("I am hewre right now")
    const nameValue = names.value.trim()
    const usernameValue = username.value.trim()
    const emailValue = email.value.trim()
    const masterPasswordValue = masterPassword.value.trim()
    console.log("Hello..")
    // validatiing inputs
    checkUsername(usernameValue)
    checkEmail(emailValue)
    checkPassword(masterPasswordValue)

    // const response = await fetch('/auth/create',{
    //     method:"POST",
    //     redirect:'follow',
    //     headers: {
	// 		"Content-Type": "application/json",
	// 		"Accept": "application/json"
	// 	},
    //     body:JSON.stringify({
    //         name:nameValue,
    //         username:usernameValue,
    //         email:emailValue,
    //         masterPassword:masterPasswordValue,
    //     })
    // })
    xmlhttp.open("POST",'/auth/create')
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.setRequestHeader('Accept', 'application/json');
    xmlhttp.send(JSON.stringify({
             name:nameValue,
             username:usernameValue,
             email:emailValue,
             masterPassword:masterPasswordValue,
    }))
    xmlhttp.onreadystatechange = function(){
        console.log(xmlhttp.status)
        if(xmlhttp.status===200){
            // succesful creation of account meaning succesful insertion into table
            return window.location.href = '/login'
        }
        window.location.href = '/create'
        console.log("ERROR")

    };
})



// const checkValidity = ()=>{
//     checkUsername(usernameValue)
//     checkEmail()
// }

const checkUsername = async (usernameInput)=>{
    const user = await UsernameExist(usernameInput)
    if(!usernameValidity(usernameInput) || user) return onError(username,"Invalid username or username already exists")
    return onSuccess(username,'Username is valid')
}

const UsernameExist = async (usernameIn)=>{
    let user = await fetch(`http://localhost:5500/users/exists?username=${usernameIn}`)

    user = await user.json()

    return user.msg; // returns promise
}

// // validating email via regex
const checkEmail = async (emailValue)=>{
    const emails = await emailExist(emailValue) // returns boolean value if email exists 
    if(!emailValidity(emailValue) || emails) return onError(email,'Invalid email')
    return onSuccess(email,"Valid email address")
}

const emailExist = async (emailValue)=>{
    let email = await fetch(`http://localhost:5500/email/exists?email=${emailValue}`)

    email = await email.json()

    return email.msg; // returns promises
}

const checkPassword = passwordValue=>{
    const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
    if(re.test(passwordValue)) return onSuccess(masterPassword,'Valid password')
    return onError(masterPassword,'Invalid password')
}

const usernameValidity = username =>{
   const re = /^[a-zA-Z0-9_.!-]{3,20}$/
   return re.test(username) // returns boolean if true or false
}

// email validation using regex
const emailValidity = email =>{
    const re = /[A-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/
    return re.test(email)
}

// Password valadition using regex 
const passwordValidity = password =>{
    const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
    return re.test(password)
}

// on success 
const onSuccess = (element,message)=>{
    const parentElement = element.parentElement
    const errorDisplay = parentElement.querySelector('.error')

    errorDisplay.innerText = message
    parentElement.classList.add('success') // removes class on parent form group
    parentElement.classList.remove('error') // adds class error to parent form group

    return true

}

// on error
const onError = (element,message)=>{
    const pareElement = element.parentElement
    const errorDisplay = pareElement.querySelector('.error') // gets error div

    errorDisplay.innerText = message
    
    pareElement.classList.add('error') // adds class error to parent form group
    pareElement.classList.remove('success') // removes class on parent form group

    return false
}
