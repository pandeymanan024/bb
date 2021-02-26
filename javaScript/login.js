import { LoginController } from "../moduleJS/loginController.mjs";

var eyeicon =document.getElementById('pass-status');
eyeicon.addEventListener('click',viewPassword);

function viewPassword() {
  var passwordInput = document.getElementById("password");
  var passStatus = document.getElementById("pass-status");

  if (passwordInput.type == "password") {
    passwordInput.type = "text";
    passStatus.className = "fa fa-eye-slash";
  } else {
    passwordInput.type = "password";
    passStatus.className = "fa fa-eye";
  }
}

//Backend Validation
var element = document.querySelector("form");
element.addEventListener("submit", (event) => {
  event.preventDefault();
  var con = new LoginController();
  con.main(event);
});


