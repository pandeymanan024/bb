import {ProductObject} from "../moduleJS/bussinessObject.mjs";
import {CategoryView} from "../javaScript/category.mjs";
import {Factory} from "../moduleJS/factory.mjs";

export class CategoryController{
    constructor(){
        this.data;
    }
    main(arr){
        let productClass = Factory.productViewObject();
        productClass.getDatabase(arr);
    }
    receiveDataFromModule(response){
        this.data = response;
        this.sendDataToView(this.data);
    }

    sendDataToView(data){
        let view = Factory.showImageObject();
        view.productDisplay(data);
    }
}