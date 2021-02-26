import { AddProduct } from "../moduleJS/vendorController.mjs";

var elem = document.querySelector("form");
elem.addEventListener("submit",(event)=>{
    event.preventDefault();
    let addObject = new AddProduct();
    addObject.main(event);
});