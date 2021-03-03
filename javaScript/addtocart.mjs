import {Constants} from "../moduleJS/constants.mjs";
var cart ="";
window.onload = function(){
    cartload();
}
    function cartload(){
   
    cart = localStorage.getItem("cartvalue");
    console.log(cart);
    for(let i=0;i<cart.length%24;i++){
    var id = cart.split(',')[i];
    Constants.cartmap.set(id,1);
    console.log(id);
    var url = `https://bbecom-998a.restdb.io/rest/customer/${id}`; 

    const options={
        headers: {
            'Content-Type': 'application/json',
            'x-apikey':'602276113f9eb665a1689352'
        }
    }
    
    fetch(url,options)
        .then( (response) => { return response.json()
        }).then( (data) => { 
        console.log(data);
            
    let outerdiv = document.createElement("div");
    outerdiv.className = "cart-items";
    document.getElementsByClassName("main-inner-container")[0].appendChild(outerdiv);
    
    let innerdiv1 = document.createElement("div");
    innerdiv1.className="menu";
    let img = document.createElement("img");
    img.src = `https://bbecom-998a.restdb.io/media/${data.imageID}`;
    innerdiv1.appendChild(img);
    outerdiv.appendChild(innerdiv1);
    
    let innerdiv2 = document.createElement("div");
    let name = document.createElement("h2");
    name.innerText=data.productName;
    innerdiv2.appendChild(name);
    innerdiv2.className="main";
    outerdiv.appendChild(innerdiv2);
    
    
    let innerdiv3 = document.createElement("div");
    let price = document.createElement("h2");
    price.innerHTML = `MRP &#8377 ${data.price}`;
    let removebtn = document.createElement("button");
    removebtn.className = "book-button";
    removebtn.id = data._id;
    
    removebtn.addEventListener("click",function() {
        Constants.cartmap.set(this.id,0);
        var s="";
        Constants.cartmap.forEach((value, key) => {
        if(value == 1){
            s=s+key+",";
            Constants.cartmap.set(key,0);
        }
        Constants.itemlist=s;
    })
    console.log(Constants.cartmap);
    localStorage.setItem("cartvalue",Constants.itemlist);
    fun(); 
    });

    removebtn.innerText = "Remove";
    innerdiv3.className="checkout";
    outerdiv.appendChild(innerdiv3);
    innerdiv3.appendChild(price);
    innerdiv3.appendChild(removebtn);
    })
}

}
function fun(){
    $(".main-inner-container").empty();
    cartload();
}

    

 