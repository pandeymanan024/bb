import { CartController } from "../moduleJS/cartController.mjs";

var element = document.getElementById("cart");
element.addEventListener("click",(event)=>{
  event.preventDefault();
  let con = new CartController();
  con.main();
})
