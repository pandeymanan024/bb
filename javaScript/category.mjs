import {Constants} from "../moduleJS/constants.mjs";
import {Factory} from "../moduleJS/factory.mjs";
let counter=0;
let scroll = 350;
let showMoreResponse;
export class CategoryView{
    constructor(){
    }
    ControllerObject(arr=[]){
        let controller = Factory.categoryImageObject();
        controller.main(arr);  
    }
    productDisplay(response){
        if(response.length===undefined){
            $(Constants.LOADING_CLASS).hide();
            $(Constants.PRODUCT_CLASS).append(Constants.NO_PRODUCT_FOUND);
        }
        else{
        counter=0;
        $(Constants.LOADING_CLASS).hide();
        appendData(response);
        $(window).scroll(function(){
            if ($(window).scrollTop()>scroll && counter < 3) {
                appendData(response);
            }
        });
        $(".cart-btn").click(function(){
            if(Constants.CART_MAP.has(this.id)){
                Constants.CART_MAP.set(this.id,Constants.CART_MAP.get(this.id)+1);
              }
              else{
                Constants.CART_MAP.set(this.id,1);
              }
              var obj = [];
              Constants.CART_MAP.forEach((value, key) => {
                obj.push({key,value});
            })
              localStorage.setItem("map",JSON.stringify(obj));
        });
    }
}
}

$(document).ready(function(){
    if(window.location.pathname===Constants.WINDOW_LENGTH){
    $(Constants.SHOW_PRODUCT_CLASS).hide();
    $(Constants.NO_PRODUCT_CLASS).hide();
    let viewObject = Factory.showImageObject();
    viewObject.ControllerObject();
    $(document).on("click",Constants.FILTER_CLASS, function(){
        checkBoxEvent(viewObject);
    });

    $(document).on("keypress",Constants.FILTER_CLASS, function(event){
        if (event.which === Constants.ENTER_KEY) {
          this.checked = !this.checked;
          checkBoxEvent(viewObject);
        }
      });

    var filterButton = document.getElementById("filter");
    filterButton.addEventListener("click",(e)=>{
      e.preventDefault();
      $(Constants.SIDE_BAR_CLASS).toggle("slide");
    }); 

  //change id below
  var showMoreButton = document.getElementById("uniqueButton");
  showMoreButton.addEventListener("click",(e)=>{
      e.preventDefault();
      counter+=1;
      if(counter===8){
        $(Constants.SHOW_PRODUCT_CLASS).empty();
        $(Constants.SHOW_PRODUCT_CLASS).append(Constants.BACK_TO_TOP);
        $(Constants.UNIQUE_BUTTON_ID).click(function(){
            document.documentElement.scrollTop = 0;
        });
        }
      if(counter<10){
      appendData(showMoreResponse);
      }
  });

    }
});


function checkBoxEvent(viewObject){
    $(Constants.PRODUCT_CLASS).empty();
        $(Constants.PRODUCT_CLASS).append(Constants.LOADING);
        let ids = [];
        $(Constants.FILTER_CLASS).each(function(){
            if($(this).is(":checked")){
                let x = $(this).attr("name");
                let val = {};
                val["$regex"]=$(this).attr("value");
                let obj = {};
                obj[x]=val;
                ids.push(obj);
            }
        });
        
        viewObject.ControllerObject(ids);
}


function appendData(response){
    let length;
    if(response.length<Constants.SHOW_PRODUCT_ITEMS){
        length=response.length;
    }
    else{
        length = Constants.SHOW_PRODUCT_ITEMS;
    }
    for(let i=counter*length;i<(counter+1)*length;i++){
        let divMain = document.createElement("div");
        divMain.setAttribute("id",`item${i}`);
        divMain.setAttribute("class",Constants.ITEM_CLASS);
        let img = document.createElement("img");
        img.src = Constants.MEDIA_URL + "/" + response[i%response.length].imageID;
        img.alt = response[i%response.length].productName+" " + Constants.ALT_TEXT;
        let h2 = document.createElement("h2");
        h2.innerHTML = (response[i%response.length].productName).toUpperCase();
        let divSub = document.createElement("div");
        divSub.setAttribute("class",Constants.DETAIL_CLASS);
        divSub.setAttribute("id",`details${i}`);
        let para1 = document.createElement("p");
        para1.innerHTML =Constants.PRICE_PREFIX + `${Number(response[i%response.length].price)+15}` + Constants.PRICE_SUFFIX + `${response[i%response.length].price}`;
        let button = document.createElement("button");
        button.setAttribute("class",Constants.CART_BUTTON);
        button.setAttribute("id",response[i%response.length]._id);
        button.innerHTML = Constants.ADD_TO_CART;
        document.getElementById("product-container").appendChild(divMain);
        divMain.appendChild(img);
        divMain.appendChild(h2);
        divMain.appendChild(divSub);
        divSub.appendChild(para1);
        divSub.appendChild(button);
    }
    counter+=1;
    scroll=scroll+450;
    if(counter===3){
      $(Constants.SHOW_PRODUCT_ID).show();
      showMoreResponse = response;
    }
  }
