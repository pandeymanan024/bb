import { RegisterController } from "../moduleJS/registerController.mjs";

//UI Validation
const email = document.getElementById("email");
email.addEventListener("input", function (event) {
  if (email.validity.patternMismatch) {
    email.setCustomValidity("Not a valid e-mail address!");
  } else {
    email.setCustomValidity("");
  }
});

const phone = document.getElementById("phone");
phone.addEventListener("input", function (event) {
  if (phone.validity.patternMismatch) {
    phone.setCustomValidity("Not a valid mobile no.| Don't include +91 | Should contain 10 digits");
  } else {
    phone.setCustomValidity("");
  }
});

const pass = document.getElementById("password");
pass.addEventListener("input", function (event) {
  if (pass.validity.patternMismatch) {
    pass.setCustomValidity(
      "Password should contain minimum 8 characters,At least one Uppercase letter,one Lowercase and one special character{#?!@$%^&*-}"
    );
  } else {
    pass.setCustomValidity("");
  }
});
    

function disablebtn(){
  document.getElementById("submit").disabled=true;
}

var myInput = document.getElementById("password");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");
var special = document.getElementById("special");

myInput.onfocus = function() {
  document.getElementById("passhidden").className="password-specs";
}

myInput.onkeyup = function() {
  
  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {  
    letter.className="valid";
  } else {
    letter.className="invalid";
  }

  
  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {  
    capital.className="valid";
  } else {
    capital.className="invalid";
  }

  //Validate numeric character
  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {  
    number.className="valid";
  } else {
    number.className="invalid";
  }
  
  // Validate length
  if(myInput.value.length >= 8) {
    length.className="valid";
  } else {
    length.className="invalid";
  }

  // Special character
 var special1 = /[#?!@$%^&]/g;
 if(myInput.value.match(special1)) {  
   special.className="valid";
 } else {
   special.className="invalid";
 }
}

var showpass =document.getElementById('pass-status');
showpass.addEventListener('click',viewPassword);

function viewPassword() {
  var passwordInput = document.getElementById("password");
  var passStatus = document.getElementById("pass-status");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    
  } else {
    passwordInput.type = "password";
    
  }
}

//Backend Validation
var elem = document.querySelector("form");
elem.addEventListener("submit", (event) => {
  event.preventDefault();
  var store = new RegisterController();
  store.main(event);
  disablebtn();
});
