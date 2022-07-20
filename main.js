// browserify config

const Cryptr = require('cryptr');

console.log("SUCCESFUL")
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
console.log(document)
const a = document.getElementById('encrypt-btn')
console.log(a)
const buttons = document.querySelectorAll('#encrypt-btn') // returns all buttons with specific id in array data structure 
for(const button of buttons){
    const encryptedString = button.textContent || button.innerText
    button.addEventListener('click',()=>{
        const cryptr = new Cryptr(getCookie('master_password'))
        const buttonValue =  button.textContent || button.innerText
        const dcryptedPassword = cryptr.decrypt(buttonValue)
        if(buttonValue!==dcryptedPassword){
            // if button value is not equal to the decrypted password then it is shown
            button.innerHTML = dcryptedPassword
        }
        else{
            //else if the decrypted password is shown the ecnrypted password is shown
            button.innerHTML = encryptedString
        }
        console.log(dcryptedPassword)
        console.log(buttonValue)
    // console.log("I clicked the encrypt-decrypt button")
    // console.log(getCookie('master_password'))
    })

}
