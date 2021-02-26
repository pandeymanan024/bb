function add(){

    let outerdiv = document.createElement("div");
    outerdiv.className = "cart-items";
    document.getElementsByClassName("main-inner-container")[0].appendChild(outerdiv);
    
    let innerdiv1 = document.createElement("div");
    innerdiv1.className="menu";
    outerdiv.appendChild(innerdiv1);
    
    let innerdiv2 = document.createElement("div");
    let n = document.createElement("h2");
    n.className="name-tag";
    innerdiv2.appendChild(n);
    innerdiv2.className="main";
    outerdiv.appendChild(innerdiv2);
    
    
    let innerdiv3 = document.createElement("div");
    let p = document.createElement("h2");
    p.className="price-tag";
    innerdiv3.appendChild(p);
    innerdiv3.className="checkout";
    outerdiv.appendChild(innerdiv3);

    var apikey="602276113f9eb665a1689352"; 
    var id='6036213e9fc7b60c0001fad3';
    var url=`https://bbecom-998a.restdb.io/rest/customer/${id}`;
    const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'x-apikey': apikey
    }
    
    };

    const f2 = () => {

        fetch(url,options)
        .then( (response) => { return response.json()
        }).then( (data) => { 
            n.innerText=data.productName
            p.innerHTML='<span>&#8377;</span>'+data.price
        })
    }
    f2();

}


