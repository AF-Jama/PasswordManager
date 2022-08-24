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
    const encryptedString = button.textContent || button.innerText // gets encrypted string from button
    button.addEventListener('click',()=>{
        const cryptr = new Cryptr(getCookie('master_password'))
        const buttonValue =  button.textContent || button.innerText
        if(buttonValue===encryptedString){
          // if button value is not equal to the decrypted password then it is shown
          const dcryptedPassword = cryptr.decrypt(buttonValue)
          button.innerHTML = dcryptedPassword
          button.style.overflow = 'visible'
          button.style.width = 'auto'
        }
        else{
            //else if the decrypted password is shown the ecnrypted password is shown
            button.innerHTML = encryptedString
            button.style.overflow = 'hidden'
            button.style.width = '150px'
        }
    // console.log("I clicked the encrypt-decrypt button")
    // console.log(getCookie('master_password'))
    })

}


const show_button = document.getElementById('show-all-passwords-btn') // show all button
const passwordButtons = document.querySelectorAll('#encrypt-btn')
show_button.addEventListener('click',e=>{
  e.preventDefault()
  const cryptr = new Cryptr(getCookie('master_password'))
  for(const button of passwordButtons){
    try{
      const decryptedValue = cryptr.decrypt(button.innerText);
      button.innerHTML = decryptedValue;
      button.style.overflow = 'visible'
      button.style.width = 'auto'
    }catch{
      // triggered when inner text cannot be decrypted
      continue
    }
  }

  
})
