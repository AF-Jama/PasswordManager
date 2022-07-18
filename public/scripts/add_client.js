const addSitePasswordForm = document.getElementById('add-site-password-form')
const SiteNameInput = document.getElementById('form-control-site-name')
const sitePasswordInput = document.getElementById('form-control-site-password')

const xmlhttp = new XMLHttpRequest()

addSitePasswordForm.addEventListener('submit',e=>{
    e.preventDefault()

    const SiteNameInputValue = SiteNameInput.value.trim()
    const sitePasswordInputValue = sitePasswordInput.value.trim()
    console.log(SiteNameInputValue)
    console.log(sitePasswordInputValue)
    // if (SiteNameInputValue.isEmpty() && sitePasswordInputValue.isEmpty()){
    //     return window.location.href = '/mainpage/add'
    // }
    xmlhttp.open("POST",'/mainpage/add')
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.setRequestHeader('Accept', 'application/json');
    xmlhttp.send(JSON.stringify({
        siteName:SiteNameInputValue,
        sitePassword:sitePasswordInputValue
    }))
    xmlhttp.onreadystatechange = function(){
        console.log(xmlhttp.status)
        if(xmlhttp.status===200){
            // succesful creation of account meaning succesful insertion into table
            return window.location.href = '/mainpage' // returns to main page after a succesful commit
        }
        window.location.href = '/mainpage/add'

    };
})

// toggle button