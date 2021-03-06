import { Constants } from "../moduleJS/constants.mjs";

var cart = "";
window.onload = function () {
  cartload();
};
function cartload() {
  cart = JSON.parse(localStorage.getItem("map"));

  for (let i = 0; i < cart.length; i++) {
    Constants.CART_MAP.set(cart[i].key, cart[i].value);
  }

  for (let i = 0; i < cart.length; i++) {
    var url = Constants.CUSTOMER_URL + `/${cart[i].key}`;

    const options = {
      headers: {
        "Content-Type": "application/json",
        "x-apikey": Constants.CUSTOMER_API_KEY,
      },
    };

    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        let outerdiv = document.createElement("div");
        outerdiv.className = "cart-items";
        document.getElementsByClassName("main-inner-container")[0].appendChild(outerdiv);

        let innerdiv1 = document.createElement("div");
        innerdiv1.className = "menu";
        let img = document.createElement("img");
        img.src = Constants.MEDIA_URL + `/${data.imageID}`;
        innerdiv1.appendChild(img);
        outerdiv.appendChild(innerdiv1);

        let innerdiv2 = document.createElement("div");
        let name = document.createElement("h2");
        name.innerText = data.productName;
        innerdiv2.appendChild(name);
        innerdiv2.className = "main";
        outerdiv.appendChild(innerdiv2);

        let innerdiv3 = document.createElement("div");
        let price = document.createElement("h2");
        price.innerHTML = `MRP &#8377 ${data.price}`;
        let removebtn = document.createElement("button");
        removebtn.className = "book-button";
        removebtn.id = data._id;

        removebtn.addEventListener("click", function () {
          Constants.CART_MAP.set(this.id, 0);
          var obj = [];
          Constants.CART_MAP.forEach((value, key) => {
            if (value != 0) {
              Constants.CART_MAP.set(key, 0);
              obj.push({ value, key });
            }
          });
          localStorage.setItem("map", JSON.stringify(obj));
          reload();
        });
        removebtn.innerText = "Remove";
        innerdiv3.className = "checkout";
        outerdiv.appendChild(innerdiv3);
        innerdiv3.appendChild(price);
        innerdiv3.appendChild(removebtn);
      });
  }
}
function reload() {
  $(".main-inner-container").empty();
  cartload();
}
