import { ForgotController } from "../moduleJS/forgotController.mjs";

//Backend validation
var element = document.querySelector("form");
element.addEventListener("submit", (event) => {
  event.preventDefault();
  var con = new ForgotController();
  con.main(event);
});







