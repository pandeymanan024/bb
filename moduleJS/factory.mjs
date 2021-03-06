import { RegisterBusinessObject, OtpValidate, ResetPassword,ForgotPassword, LoginBusinessObject, ImageStore, ProductObject} from "../moduleJS/bussinessObject.mjs";
import { Constants } from "../moduleJS/constants.mjs";
import {CategoryView} from "../javaScript/category.mjs";
import {CategoryController} from "../moduleJS/categoryController.mjs";

export class Factory {
  constructor() {}

  static getEventData(event) {
    this.dataObj = new FormData(event.target);
    this.data = Object.fromEntries(this.dataObj.entries());
    return this.data;
  }

  static getMediaData(){
    this.formData = new FormData();
    this.files = document.getElementById("image-id").files;
    for(let i=0;i<this.files.length;i++){
        this.formData.append('myfile',this.files[i],this.files[i].name);
    }
    console.log(this.formData.getAll('myfile'));
    console.log(this.formData.length);
    return this.formData;
  }

  static registration = "";
  static registerObject() {
    if (this.registration === "") {
      this.registration = new RegisterBusinessObject();
    }
    return this.registration;
  }

  static login = "";
  static loginObject() {
    if (this.login === "") {
      this.login = new LoginBusinessObject();
    }
    return this.login;
  }

  static forgot = "";
  static forgotObject() {
    if (this.forgot === "") {
      this.forgot = new ForgotPassword();
    }
    return this.forgot;
  }

  static cart = "";
  static cartObject() {
    if (this.cart === "") {
      this.cart = new Cart();
    }
    return this.cart;
  }

  static passwordReset = "";
  static passwordResetObject() {
    if (this.passwordReset === "") {
      this.passwordReset = new ResetPassword();
    }
    return this.passwordReset;
  }

  static otpInstance = "";
  static otpObject() {
    if (this.otpInstance === "") {
      this.otpInstance = new OtpValidate();
    }
    return this.otpInstance;
  }

  static imageStoreInstance = "";
  static imageStoreObject() {
    if (this.imageStoreInstance === "") {
      this.imageStoreInstance = new ImageStore();
    }
    return this.imageStoreInstance;
  }

  static productImage = "";
  static showImageObject() {
    if (this.productImage === "") {
      this.productImage = new CategoryView();
    }
    return this.productImage;
  }

  static categoryObject = "";
  static categoryImageObject() {
    if (this.categoryObject === "") {
      this.categoryObject = new CategoryController();
    }
    return this.categoryObject;
  }

  static productObject = "";
  static productViewObject() {
    if (this.productObject === "") {
      this.productObject = new ProductObject();
    }
    return this.productObject;
  }

  static getHttpRequest(method, url, key) {
    var request = new XMLHttpRequest();
    request.open(method, url, true);
    request.setRequestHeader(Constants.CONTENT_TYPE, Constants.DATA_TYPE);
    request.setRequestHeader(Constants.API_KEY, key);
    return request;
  }

  static getMediaHttpRequest(method, url, key) {
    var request = new XMLHttpRequest();
    request.open(method, url, true);
    request.setRequestHeader(Constants.API_KEY, key);
    return request;
  }
}
