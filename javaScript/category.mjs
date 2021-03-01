import {CategoryController} from "../moduleJS/categoryController.mjs";
import {Constants} from "../moduleJS/constants.mjs";
var counter=0;
var temp = 750;
export class CategoryView{
    constructor(){
    }
    ControllerObject(){
        let con = new CategoryController();
        con.main();  
    }
    productDisplay(response){
        console.log(response);
        appendData(response);
        $(window).scroll(function(){
            console.log($(window).scrollTop(),$(document).height(),$(window).height(),counter);
            if ($(window).scrollTop()>temp && counter < 3) {
                appendData(response);
            }
        });
    }
}

$(document).ready(function(){
    if(window.location=="http://127.0.0.1:5501/html/category.html"){
    let Obj = new CategoryView();
    Obj.ControllerObject();
    }
});

function appendData(response){
    let length = response.length;
    // console.log(length,response);
    for(let i=counter*length;i<(counter+1)*length;i++){
        console.log(i%length);
        let divMain = document.createElement("div");
        divMain.setAttribute("id",`item${i}`);
        divMain.setAttribute("class","items");
        let img = document.createElement("img");
        img.src = Constants.MediaUrl + "/" + response[i%length].imageID;
        img.alt = response[i%length].productName;
        let h2 = document.createElement("h2");
        h2.innerHTML = (response[i%length].productName).toUpperCase();
        let divSub = document.createElement("div");
        divSub.setAttribute("class","details");
        divSub.setAttribute("id",`details${i}`);
        let para1 = document.createElement("p");
        para1.innerHTML =`MRP<sup><del> &#8377; ${Number(response[i%length].price)-10} </del></sup>&#8377; ${response[i%length].price}`;
        // let para2 = document.createElement("p");
        // para2.innerHTML = response[i%length].packSize;
        let button = document.createElement("button");
        button.setAttribute("class","cartbtn");
        button.innerHTML = "ADD TO CART";
        document.getElementById("product-container").appendChild(divMain);
        divMain.appendChild(img);
        divMain.appendChild(h2);
        divMain.appendChild(divSub);
        divSub.appendChild(para1);
        // divSub.appendChild(para2);
        divSub.appendChild(button);
    }
    counter+=1;
    // console.log(counter);
    temp=temp+750;
    if(counter==3){
      $('#product-container').append('<button id="uniqueButton" style="margin-left: 50%; background-color: powderblue;">Click</button><br /><br />');
    }
  }