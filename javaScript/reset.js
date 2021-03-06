import { ResetController } from "../moduleJS/newPasswordController.mjs";

//UI validation
var myInput = document.getElementById("new-password");
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


//Backend
var element = document.querySelector("form");
element.addEventListener("submit", (event) => {
  event.preventDefault();
  var con = new ResetController();
  con.main(event);
});
