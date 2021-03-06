import { Factory } from "../moduleJS/factory.mjs";

// see the elem variable usage
var elem = document.querySelector("form");
elem.addEventListener("submit",(event)=>{
    event.preventDefault();
    $(".product-container").empty();
    let searchformData = Factory.getEventData(event);
    let arr=[{ "productName": {"$regex": `${searchformData.search}`}},{ "category": {"$regex" :`${searchformData.search}`}},{ "brand": {"$regex" :`${searchformData.search}`}}]
    let searchObject = Factory.showImageObject();
    searchObject.ControllerObject(arr);

});
