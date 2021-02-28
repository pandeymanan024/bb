import {CategoryController} from "../moduleJS/categoryController.mjs";
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
        $(window).scroll(function(response){
            console.log($(window).scrollTop(),$(document).height(),$(window).height(),counter);
            if ($(window).scrollTop()>temp && counter < 3) {
                appendData(response);
            }
        });
    }
}

$(document).ready(function(){
    let Obj = new CategoryView();
    Obj.ControllerObject();
});

function appendData(response){
    for(let i=0;i<25;i++){
        let divMain = document.createElement("div");
        divMain.setAttribute("id",`item${i}`);
        divMain.setAttribute("class","items");
        let img = document.createElement("img");
        img.src = "../resources/prod.jpg";
        img.alt = "maida";
        let h2 = document.createElement("h2");
        h2.innerHTML = "BB Royal Maida";
        let divSub = document.createElement("div");
        divSub.setAttribute("class","details");
        divSub.setAttribute("id",`details${i}`);
        let para1 = document.createElement("p");
        para1.innerHTML = "MRP<sup><del> &#8377; 30 </del></sup>&#8377; 20";
        let para2 = document.createElement("p");
        para2.innerHTML = "1 unit (500 g)";
        let button = document.createElement("button");
        button.setAttribute("class","cartbtn");
        button.innerHTML = "ADD TO CART";
        document.getElementById("product-container").appendChild(divMain);
        divMain.appendChild(img);
        divMain.appendChild(h2);
        divMain.appendChild(divSub);
        divSub.appendChild(para1);
        divSub.appendChild(para2);
        divSub.appendChild(button);
    }
    counter+=1;
    temp=temp+750;
    if(counter==3){
      $('#product-container').append('<button id="uniqueButton" style="margin-left: 50%; background-color: powderblue;">Click</button><br /><br />');
    }
  }