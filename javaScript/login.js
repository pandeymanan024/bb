import { LoginController } from "../moduleJS/loginController.mjs";

var showpass =document.getElementById('pass-status');
showpass.addEventListener('click',viewPassword);

function viewPassword() {
  var passwordInput = document.getElementById("password");
  
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    
  } else {
    passwordInput.type = "password";
    
  }
}

//Backend Validation
var element = document.querySelector("form");
element.addEventListener("submit", (event) => {
  event.preventDefault();
  var con = new LoginController();
  con.main(event);
});


