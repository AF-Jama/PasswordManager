const form = document.getElementById('create-account-form')
const usernameInput = document.getElementById('login-username-input')
const passwordInput = document.getElementById('login-masterPassword-input')
const xmlhttp = new XMLHttpRequest()

form.addEventListener('submit',e=>{
    e.preventDefault()

    const usernameInputValue = usernameInput.value.trim()
    const passwordInputValue = passwordInput.value.trim()

    xmlhttp.open("POST",'/auth/login')
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.setRequestHeader('Accept', 'application/json');
    xmlhttp.send(JSON.stringify({
        username:usernameInputValue,
        masterPassword:passwordInputValue
    }))
    xmlhttp.onreadystatechange = function(){
        console.log(xmlhttp.status)
        if(xmlhttp.status===200){
            // succesful creation of account meaning succesful insertion into table
            return window.location.href = '/mainpage'
        }
        window.location.href = '/login'
        console.log("ERROR")

    };
})