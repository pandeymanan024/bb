import { RegisterBusinessObject, OtpValidate, ResetPassword,ForgotPassword, LoginBusinessObject, ImageStore, Cart } from "../moduleJS/bussinessObject.mjs";
import { Constants } from "../moduleJS/constants.mjs";

export class Factory {
  constructor() {}

  static getEventData(event) {
    this.dataObj = new FormData(event.target);
    this.data = Object.fromEntries(this.dataObj.entries());
    return this.data;
  }

  static getMediaData(){
    this.formData = new FormData();
    this.files = document.getElementById("image").files;
    for(let i=0;i<this.files.length;i++){
        this.formData.append('myfile',this.files[i],this.files[i].name);
    }
    console.log(this.formData.getAll('myfile'));
    return this.formData;
  }

  static registration = "";
  static registerObject() {
    if (this.registration == "") {
      this.registration = new RegisterBusinessObject();
    }
    return this.registration;
  }

  static login = "";
  static loginObject() {
    if (this.login == "") {
      this.login = new LoginBusinessObject();
    }
    return this.login;
  }

  static forgot = "";
  static forgotObject() {
    if (this.forgot == "") {
      this.forgot = new ForgotPassword();
    }
    return this.forgot;
  }

  static cart = "";
  static cartObject() {
    if (this.cart == "") {
      this.cart = new Cart();
    }
    return this.cart;
  }

  static passwordReset = "";
  static passwordResetObject() {
    if (this.passwordReset == "") {
      this.passwordReset = new ResetPassword();
    }
    return this.passwordReset;
  }

  static otpInstance = "";
  static otpObject() {
    if (this.otpInstance == "") {
      this.otpInstance = new OtpValidate();
    }
    return this.otpInstance;
  }

  static imageStoreInstance = "";
  static imageStoreObject() {
    if (this.imageStoreInstance == "") {
      this.imageStoreInstance = new ImageStore();
    }
    return this.imageStoreInstance;
  }

  static getHttpRequest(method, url, key) {
    var request = new XMLHttpRequest();
    request.open(method, url, true);
    request.setRequestHeader(Constants.ContentType, Constants.DataType);
    request.setRequestHeader(Constants.ApiKey, key);
    return request;
  }

  static getMediaHttpRequest(method, url, key) {
    var request = new XMLHttpRequest();
    request.open(method, url, true);
    request.setRequestHeader(Constants.ApiKey, key);
    return request;
  }
}
