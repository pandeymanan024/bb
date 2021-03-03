import {Constants} from "../moduleJS/constants.mjs";
// Landing Page - Carousel
//function addto(id){
//   var addto = function(id){
//   Constants.s=Constants.s+id+",";
//   localStorage.setItem("cartvalue",Constants.s);
// }
$(document).ready(function () {
  var a = ["home.jpg", "car2.jpg", "car3.jpg", "car4.jpg"];
  var i = 0;
  function changeImage() {
    $("#carousel").fadeOut(200, function () {
      i++;
      if (i == a.length) {
        i = 0;
      }
      $("#carousel").attr({
        src: `../resources/${a[i]}`,
        alt: a[i].split(".")[0],
      });
    });
    $("#carousel").fadeIn(200);
  }
  var interval = setInterval(changeImage, 3000);
});

// Landing Page add to cart
$(document).ready(function () {
  //debugger;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": "602276113f9eb665a1689352",
    },
  };
  var data;
  fetch("https://bbecom-998a.restdb.io/rest/customer", options)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      data = response;
	  console.log(data);

      for (var i = 2; i < 6; i++) {
        let itemDiv = document.createElement("div");
        itemDiv.className = "items";
        document.getElementsByClassName("item-container")[0].appendChild(itemDiv);

        let im = document.createElement("img");
        im.src = `https://bbecom-998a.restdb.io/media/${data[i].imageID}`;
        im.alt = data.productName;
        itemDiv.appendChild(im);

        let h = document.createElement("h2");
        h.innerHTML = data[i].productName;
        itemDiv.appendChild(h);

        let detailsDiv = document.createElement("div");
        detailsDiv.className = "details";
        itemDiv.appendChild(detailsDiv);

        let productPrice = document.createElement("p");
        productPrice.innerHTML = `MRP &#8377 ${data[i].price}`;
        detailsDiv.appendChild(productPrice);

        let productQuantity = document.createElement("p");
        productQuantity.innerText = data[i].size+" unit ";
        detailsDiv.appendChild(productQuantity);
        
        var btn = document.createElement("button");
        btn.className = "cart-btn";
        btn.innerText = "ADD TO CART";
        btn.id = data[i]._id;
        itemDiv.appendChild(btn);
        btn.addEventListener("click",function() {
          Constants.itemlist=localStorage.getItem("cartvalue")+this.id+",";
          localStorage.setItem("cartvalue",Constants.itemlist); 
        });
      }   
    });
});


