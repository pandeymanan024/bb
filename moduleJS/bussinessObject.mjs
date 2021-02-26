import { Constants } from "../moduleJS/constants.mjs";
import { Factory } from "../moduleJS/factory.mjs";
import { Hashing } from "../moduleJS/hashing.mjs";

export class RegisterBusinessObject {
  constructor() {}

  storeDataBase(formData) {
    this.request = Factory.getHttpRequest(
      Constants.PostMethod,
      Constants.CustomerUrl,
      Constants.CustomerApiKey
    );
    this.request.onload = () => {};
    this.request.send(JSON.stringify(formData));
  }

  getDatabase(formData) {
    this.addMsg = Constants.AddMsg;
    try {
      let data = JSON.stringify({ email: formData.email });
      this.request = Factory.getHttpRequest(
        Constants.GetMethod,
        `${Constants.CustomerUrl}?q=${data}`,
        Constants.CustomerApiKey
      );
      this.request.onload = () => {
        let response = JSON.parse(this.request.responseText);
        this.registerVerify(response[0], formData);
        return this.addMsg;
      };
      this.request.send();
    } catch (e) {
      Constants.RegisterHtmlElement.innerHTML = "Server is not responding";
    }
  }

  registerVerify(databaseObject, formData) {
    if (databaseObject === undefined){
      this.storeDataBase(formData);
      this.addMsg = Constants.AddMsg;
      Constants.RegisterHtmlElement.innerHTML = this.addMsg;
    }
    else{
      Constants.RegisterHtmlElement.innerHTML = this.addMsg;
      if (databaseObject.email === formData.email) {
        this.addMsg = Constants.DupMsg;
        Constants.RegisterHtmlElement.innerHTML = this.addMsg;
      } else {
        this.storeDataBase(formData);
        this.addMsg = Constants.AddMsg;
        Constants.RegisterHtmlElement.innerHTML = this.addMsg;
      }
    }
  }
}

export class LoginBusinessObject {
  constructor() {}
  getDatabase(formData) {
    const data = JSON.stringify({ email: formData.Username });
    this.request = Factory.getHttpRequest(
      Constants.GetMethod,
      `${Constants.CustomerUrl}?q=${data}`,
      Constants.CustomerApiKey
    );
    this.request.onload = () => {
      try {
        let response = JSON.parse(this.request.responseText);
        this.loginVerify(response[0], formData);
      } catch (e) {
        Constants.LoginHtmlElement.innerHTML =
          "Server Not Found or Invalid Entries";
      }
    };
    this.request.send();
  }

  loginVerify(databaseObject, formData) {
    if (databaseObject.email === formData.Username) {
      if (databaseObject.password === formData.Password) {
        Constants.LoginHtmlElement.innerHTML = "Signed In";
      } else {
        Constants.LoginHtmlElement.innerHTML =
          "Server Not Found or Invalid Entries";
      }
    }
  }
}

export class ForgotPassword {
  constructor() {}

  otpGenerator(formData) {
    Constants.OtpHtmlElement.value = Math.floor(1000 + Math.random() * 9000);
    let hash = new Hashing();
    formData.otp = hash.encrypt(Constants.OtpHtmlElement.value);
    formData.timeStamp = Date.now();
    const data = JSON.stringify({ email: formData.email });
    this.request = Factory.getHttpRequest(
      Constants.GetMethod,
      `${Constants.CustomerUrl}?q=${data}`,
      Constants.CustomerApiKey
    );
    this.request.onload = () => {
      try {
        let response = JSON.parse(this.request.responseText);
        this.idFinder(response[0], formData);
      } catch (e) {
        Constants.ForgotPasswordMsg.innerHTML = "Server Not Found";
      }
    };
    this.request.send();
  }

  idFinder(databaseObject, formData) {
    if (databaseObject.email === formData.email) {
      let identity = databaseObject._id;
      localStorage.setItem("id", identity);
      this.request = Factory.getHttpRequest(
        Constants.PutMethod,
        Constants.CustomerUrl + "/" + databaseObject._id,
        Constants.CustomerApiKey
      );
      this.request.onload = () => {
        try {
          document.location = "../html/OTP.html";
        } catch (e) {}
      };
      this.request.send(JSON.stringify(formData));
      Constants.ForgotPasswordMsg.innerHTML = "OTP Sent";
      let serviceID = "gmail";
      let templateID = "template_4abmypz";
      emailjs.sendForm(serviceID, templateID, Constants.FormId);
    }
  }
}

export class ResetPassword {
  constructor() {}

  resetValidate(databaseObject, formData) {
    if (databaseObject.email === formData.email) {
      let databaseId = databaseObject._id;
      delete formData.email;
      delete formData.confirmPassword;
      this.putDatabase(databaseId, formData);
      Constants.ResetError.innerHTML = "Password reset successful";
      return;
    }
    else {
      Constants.ResetError.innerHTML = "User not found";
    }
  }

  getDatabase(formData) {
    const data = JSON.stringify({ email: formData.email });
    this.request = Factory.getHttpRequest(
      Constants.GetMethod,
      `${Constants.CustomerUrl}?q=${data}`,
      Constants.CustomerApiKey
    );
    this.request.onload = () => {
      try {
        let response = JSON.parse(this.request.responseText);
        this.resetValidate(response[0], formData);
      } catch (e) {
        Constants.ResetError.innerHTML = "Server Not Found";
      }
    };
    this.request.send();
  }

  putDatabase(databaseId, databaseObject) {
    this.request = Factory.getHttpRequest(
      Constants.PutMethod,
      Constants.CustomerUrl + "/" + databaseId,
      Constants.CustomerApiKey
    );
    this.request.send(JSON.stringify(databaseObject));
  }
}

export class OtpValidate {
  constructor() {
    this.formObj = localStorage.getItem("obj");
    this.identity = localStorage.getItem("id");
  }

  getDatabase(formData) {
    this.request = Factory.getHttpRequest(
      Constants.GetMethod,
      Constants.CustomerUrl + "/" + localStorage.getItem("id"),
      Constants.CustomerApiKey
    );
    this.request.onload = () => {
      try {
        let hash = new Hashing();
        let response = JSON.parse(this.request.responseText);
        if (
          Date.now() - response.timeStamp < 40000 &&
          hash.decrypt(response.otp) == formData.otp
        ) {
          console.log("Otp Verified");
          document.location = "../html/reset.html";
        } else if (
          Date.now() - response.timeStamp < 40000 &&
          hash.decrypt(response.otp) != formData.otp
        ) {
          console.log("Wrong OTP");
          Constants.OTPError.innerHTML = "Wrong OTP";
        } else {
          console.log("OTP Expired");
          Constants.OTPError.innerHTML = "OTP expired";
        }
      } catch (e) {}
    };
    this.request.send();
  }
}

export class ImageStore{
  constructor(){

  }
  getDatabase(formData){
    this.request = Factory.getMediaHttpRequest(Constants.PostMethod,Constants.MediaUrl,Constants.CustomerApiKey);
    // this.request = new XMLHttpRequest();
    // this.request.open('POST','https://bbecom-998a.restdb.io/media',true);
    // this.request.setRequestHeader('x-apikey','602276113f9eb665a1689352');
    this.request.onload = ()=>{
      const response = this.request.responseText;
      console.log(response);
      const obj={
        productName:document.getElementById("product-name").value,
        price:document.getElementById("price").value,
        category:document.getElementById("category").value,
        brand:document.getElementById("brand").value,
        seasonal:document.getElementById("seasonal").value,
        origin:document.getElementById("origin").value,
        discount:document.getElementById("discount").value,
        packSize:document.getElementById("pack-size").value,
        imageID:response.split(`"`)[11]
      }
      this.postData(obj);
    }
    this.request.send(formData);
  }

  postData(formData){
    this.request = Factory.getHttpRequest(Constants.PostMethod,Constants.CustomerUrl,Constants.CustomerApiKey);
    this.request.onload = ()=>{
      const response = this.request.responseText;
      console.log(response);
    }
    this.request.send(JSON.stringify(formData));
  }
}

export class Cart{
  constructor(){

  }

  add(){
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
}
