import { Constants } from "../moduleJS/constants.mjs";
import { Factory } from "../moduleJS/factory.mjs";
import { Hashing } from "../moduleJS/hashing.mjs";

export class RegisterBusinessObject {
  constructor() {}

  storeDataBase(formData) {
    this.request = Factory.getHttpRequest(
      Constants.POST_METHOD,
      Constants.USER_URL,
      Constants.USER_API_KEY
    );
    this.request.onload = () => {};
    this.request.send(JSON.stringify(formData));
  }

  getDatabase(formData) {
    this.ADD_MSG = Constants.ADD_MSG;
    try {
      let data = JSON.stringify({ email: formData.email });
      this.request = Factory.getHttpRequest(
        Constants.GET_METHOD,
        `${Constants.USER_URL}?q=${data}`,
        Constants.USER_API_KEY
      );
      this.request.onload = () => {
        let response = JSON.parse(this.request.responseText);
        this.registerVerify(response[0], formData);
        return this.ADD_MSG;
      };
      this.request.send();
    } catch (e) {
      Constants.REGISTER_HTML_ELEMENT.innerHTML = "Server is not responding";
    }
  }

  registerVerify(databaseObject, formData) {
    if (databaseObject === undefined){
      this.storeDataBase(formData);
      this.ADD_MSG = Constants.ADD_MSG;
      Constants.REGISTER_HTML_ELEMENT.innerHTML = this.ADD_MSG;
    }
    else{
      Constants.REGISTER_HTML_ELEMENT.innerHTML = this.ADD_MSG;
      if (databaseObject.email === formData.email) {
        this.ADD_MSG = Constants.DUP_MSG;
        Constants.REGISTER_HTML_ELEMENT.innerHTML = this.ADD_MSG;
      } else {
        this.storeDataBase(formData);
        this.ADD_MSG = Constants.ADD_MSG;
        Constants.REGISTER_HTML_ELEMENT.innerHTML = this.ADD_MSG;
      }
    }
  }
}

export class LoginBusinessObject {
  constructor() {}
  getDatabase(formData) {
    const data = JSON.stringify({ email: formData.Username });
    this.request = Factory.getHttpRequest(
      Constants.GET_METHOD,
      `${Constants.USER_URL}?q=${data}`,
      Constants.USER_API_KEY
    );
    this.request.onload = () => {
      try {
        let response = JSON.parse(this.request.responseText);
        this.loginVerify(response[0], formData);
      } catch (e) {
        Constants.LOGIN_HTML_ELEMENT.innerHTML =
          "Invalid Entry";
      }
    };
    this.request.send();
  }

  loginVerify(databaseObject, formData) {
    if (databaseObject.email === formData.Username) {
      if (databaseObject.password === formData.Password) {
        document.location = "../html/landing.html";
      } else {
        Constants.LOGIN_HTML_ELEMENT.innerHTML =
          "Invalid Entry";
      }
    }
  }
}

export class ForgotPassword {
  constructor() {}

  otpGenerator(formData) {
    Constants.OTP_HTML_ELEMENT.value = Math.floor(1000 + Math.random() * 9000);
    let hash = new Hashing();
    formData.otp = hash.encrypt(Constants.OTP_HTML_ELEMENT.value);
    formData.timeStamp = Date.now();
    const data = JSON.stringify({ email: formData.email });
    this.request = Factory.getHttpRequest(
      Constants.GET_METHOD,
      `${Constants.USER_URL}?q=${data}`,
      Constants.USER_API_KEY
    );
    this.request.onload = () => {
      try {
        let response = JSON.parse(this.request.responseText);
        this.idFinder(response[0], formData);
      } catch (e) {
        Constants.FORGOT_PASSWORD_MSG.innerHTML = "Server Not Found";
      }
    };
    this.request.send();
  }

  idFinder(databaseObject, formData) {
    if (databaseObject.email === formData.email) {
      let identity = databaseObject._id;
      localStorage.setItem("id", identity);
      this.request = Factory.getHttpRequest(
        Constants.PUT_METHOD,
        Constants.USER_URL + "/" + databaseObject._id,
        Constants.USER_API_KEY
      );
      this.request.onload = () => {
        try {
          document.location = "../html/otp.html";
        } catch (e) {}
      };
      this.request.send(JSON.stringify(formData));
      Constants.FORGOT_PASSWORD_MSG.innerHTML = "OTP Sent";
      let serviceID = "gmail";
      let templateID = "template_4abmypz";
      emailjs.sendForm(serviceID, templateID, Constants.FORM_ID);
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
      Constants.RESET_ERROR.innerHTML = "Password reset successful";
      return;
    }
    else {
      Constants.RESET_ERROR.innerHTML = "User not found";
    }
  }

  getDatabase(formData) {
    const data = JSON.stringify({ email: formData.email });
    this.request = Factory.getHttpRequest(
      Constants.GET_METHOD,
      `${Constants.USER_URL}?q=${data}`,
      Constants.USER_API_KEY
    );
    this.request.onload = () => {
      try {
        let response = JSON.parse(this.request.responseText);
        this.resetValidate(response[0], formData);
      } catch (e) {
        Constants.RESET_ERROR.innerHTML = "Server Not Found";
      }
    };
    this.request.send();
  }

  putDatabase(databaseId, databaseObject) {
    this.request = Factory.getHttpRequest(
      Constants.PUT_METHOD,
      Constants.USER_URL + "/" + databaseId,
      Constants.USER_API_KEY
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
      Constants.GET_METHOD,
      Constants.USER_URL + "/" + localStorage.getItem("id"),
      Constants.USER_API_KEY
    );
    this.request.onload = () => {
      try {
        let hash = new Hashing();
        let response = JSON.parse(this.request.responseText);
        console.log(Date.now() - response.timeStamp,hash.decrypt(response.otp),formData.otp);
        if (
          Date.now() - response.timeStamp < 40000 &&
          hash.decrypt(response.otp) === formData.otp
        ) {
          document.location = "../html/reset.html";
        } else if (
          Date.now() - response.timeStamp < 40000 &&
          hash.decrypt(response.otp) != formData.otp
        ) {
          Constants.OTP_ERROR.innerHTML = "Wrong OTP";
        } else {
          Constants.OTP_ERROR.innerHTML = "OTP expired";
        }
      } catch (e) {}
    };
    this.request.send();
  }
}

export class ImageStore{
  constructor(){

  }

  getDatabaseEmptyImage(){
    const obj={
      productName:document.getElementById("product-name").value,
      price:document.getElementById("price").value,
      category:document.getElementById("category").value,
      brand:document.getElementById("brand").value,
      seasonal:document.getElementById("seasonal").value,
      origin:document.getElementById("origin").value,
      discount:document.getElementById("discount").value,
      packSize:document.getElementById("pack-size").value,
      imageID:Constants.DEFAULT_IMAGE_UPLOAD_ID
    }
    this.postData(obj);
  }

  getDatabase(formData){
    this.request = Factory.getMediaHttpRequest(Constants.POST_METHOD,Constants.MEDIA_URL,Constants.CUSTOMER_API_KEY);
    this.request.onload = ()=>{
      const response = this.request.responseText;
      console.log(response);
      let valueimageID = response.split(`"`)[11];
      const obj={
        productName:document.getElementById("product-name").value,
        price:document.getElementById("price").value,
        category:document.getElementById("category").value,
        brand:document.getElementById("brand").value,
        seasonal:document.getElementById("seasonal").value,
        origin:document.getElementById("origin").value,
        discount:document.getElementById("discount").value,
        packSize:document.getElementById("pack-size").value,
        imageID:valueimageID
      }
      if (valueimageID !== undefined){
        Object.assign(obj, {imageID: Constants.IMAGE_UPLOAD_ID});
        this.postData(obj);
        console.log("Done");
      }
      else{
        Object.assign(obj, {imageID: valueimageID = response.split(`"`)[11]});
        this.postData(obj);
    }
  }
    this.request.send(formData);
  }

  postData(formData){
    this.request = Factory.getHttpRequest(Constants.POST_METHOD,Constants.CUSTOMER_URL,Constants.CUSTOMER_API_KEY);
    this.request.onload = ()=>{
      const response = this.request.responseText;
      console.log(response);
    }
    this.request.send(JSON.stringify(formData));
  }
}


export class ProductObject{
  constructor(){
    this.count=0;
  }
  getDatabase(arr){
    if(arr.length===0){
    this.request = Factory.getHttpRequest(
      Constants.GET_METHOD,
      Constants.CUSTOMER_URL,
      Constants.CUSTOMER_API_KEY
    );
    }
    else{
      let obj = JSON.stringify({"$or":arr});
      let url = `${Constants.CUSTOMER_URL}?q=${obj}`;
      this.request = Factory.getHttpRequest(
        Constants.GET_METHOD,
        url,
        Constants.CUSTOMER_API_KEY
      );
    }
    this.request.onload = ()=>{
      const response = JSON.parse(this.request.responseText);
      let controller = Factory.categoryImageObject();
      controller.receiveDataFromModule(response);
    };
    this.request.send();
  }
}
