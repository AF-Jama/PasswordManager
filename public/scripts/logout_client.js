const xmlhttp = new XMLHttpRequest()

const form = document.getElementById('logout-form')



form.addEventListener('submit',e=>{
    e.preventDefault()

    xmlhttp.open("POST",'/logout')
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.setRequestHeader('Accept', 'application/json');
    xmlhttp.onreadystatechange = function(){
        console.log(xmlhttp.status)
        if(xmlhttp.status===200){
            // succesful creation of account meaning succesful insertion into table
            return window.location.href = '/login' // returns to main page after a succesful commit
        }
        window.location.href = '/mainpage'

    };
})