import { Factory } from "../moduleJS/factory.mjs";
import {Constants} from "../moduleJS/constants.mjs";

//UI Validation
const email = document.getElementById("email");
email.addEventListener("input", function (event) {
  if (email.validity.patternMismatch) {
    email.setCustomValidity("Not a valid e-mail address!");
  } else {
    email.setCustomValidity("");
  }
});

const newpass = document.getElementById("new-password");
newpass.addEventListener("input", function (event) {
  if (newpass.validity.patternMismatch) {
    newpass.setCustomValidity(
      "Password should contain minimum 8 characters,At least one Uppercase letter,one Lowercase and one special character{#?!@$%^&*-}"
    );
  } else {
    newpass.setCustomValidity("");
  }
});

const confirmpass = document.getElementById("conf-password");
confirmpass.addEventListener("input", function (event) {
  if (confirmpass.validity.patternMismatch) {
    confirmpass.setCustomValidity(
      "Password should contain minimum 8 characters,At least one Uppercase letter,one Lowercase and one special character{#?!@$%^&*-}"
    );
  } else {
    confirmpass.setCustomValidity("");
  }
});

//Backend Validation
export class ResetController {
  constructor() {}
  main(event) {
    this.data = Factory.getEventData(event);
    if (this.data.password === this.data.confirmPassword) {
      this.ro = Factory.passwordResetObject();
      this.ro.getDatabase(this.data);
    } else {
      console.log("Password Doesn't match");
    }
  }
}
