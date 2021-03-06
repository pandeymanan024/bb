import {Constants} from "../moduleJS/constants.mjs";

$(document).ready(function () {
  var a = ["home.jpg", "car2.jpg", "car3.jpg", "car4.jpg"];
  var i = 0;
  function changeImage() {
    $("#carousel").fadeOut(200, function () {
      i++;
      if (i === a.length) {
        i = 0;
      }
      $("#carousel").attr({
        src: `../resources/${a[i]}`,
        alt: a[i].split(".")[0],
      });
    });
    $("#carousel").fadeIn(200);
  }
  setInterval(changeImage, 3000);
});

// add to cart
$(document).ready(function () {
  const options = {
    method: Constants.GET_METHOD,
    headers: {
      "Content-Type": "application/json",
      "x-apikey": Constants.CUSTOMER_API_KEY,
    },
  };
  var data;
  fetch(Constants.CUSTOMER_URL, options)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      data = response;

      for (var i = 2; i < 6; i++) {
        let itemDiv = document.createElement("div");
        itemDiv.className = Constants.ITEM_CLASS;
        document.getElementsByClassName("item-container")[0].appendChild(itemDiv);

        let im = document.createElement("img");
        im.src = Constants.MEDIA_URL + `/${data[i].imageID}`;
        im.alt = data.productName;
        itemDiv.appendChild(im);

        let h = document.createElement("h2");
        h.innerHTML = data[i].productName;
        itemDiv.appendChild(h);

        let detailsDiv = document.createElement("div");
        detailsDiv.className = Constants.DETAIL_CLASS;
        itemDiv.appendChild(detailsDiv);

        let productPrice = document.createElement("p");
        productPrice.innerHTML = Constants.PRICE_PREFIX + `${Number(data[i].price)-10}` + Constants.PRICE_SUFFIX + `${data[i].price}`;
        detailsDiv.appendChild(productPrice);
        
        var btn = document.createElement("button");
        btn.className = Constants.CART_BUTTON;
        btn.innerText = Constants.ADD_TO_CART;
        btn.id = data[i]._id;
        itemDiv.appendChild(btn);

        btn.addEventListener("click",function() {
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
    });
});

// logout
$('#logout').click(function(){
  document.getElementById('logout').style.display = 'none';
  document.getElementById('signin').style.display = 'block';
  document.getElementById('signup').style.display = 'block';
});

//menu in mobile view
$('#menu').click(function(){
  $('.nav-container').toggle("slide");
  document.getElementsByClassName('ul-class')[0].style.display = 'block';
});
