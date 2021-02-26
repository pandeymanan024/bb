import { OtpVerify } from "../moduleJS/otpController.mjs";
import { Constants } from "../moduleJS/constants.mjs";
import { Factory } from "../moduleJS/factory.mjs";

var element = document.querySelector("form");
element.addEventListener("submit", (event) => {
  event.preventDefault();
  var con = new OtpVerify();
  con.main(event);
});
