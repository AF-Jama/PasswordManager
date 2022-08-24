// function getCookie(cname) {
//     let name = cname + "=";
//     let decodedCookie = decodeURIComponent(document.cookie);
//     let ca = decodedCookie.split(';');
//     for(let i = 0; i <ca.length; i++) {
//       let c = ca[i];
//       while (c.charAt(0) == ' ') {
//         c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//         return c.substring(name.length, c.length);
//       }
//     }
//     return "";
// }
const buttons = document.querySelectorAll('#encrypt-btn') // returns all buttons with specific id in array data structure 
const show_button = document.getElementById('show-all-passwords-btn')

show_button.addEventListener('click',e=>{
  e.preventDefault()

  
})
// for(const button of buttons){
//     button.addEventListener('click',()=>{
//     console.log("I clicked the encrypt-decrypt button")
//     console.log(getCookie('master_password'))
//     })

// }