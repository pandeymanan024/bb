import {ProductObject} from "../moduleJS/bussinessObject.mjs";
import {CategoryView} from "../javaScript/category.mjs";

export class CategoryController{
    constructor(){
        this.data;
    }
    main(){
        let co = new ProductObject();
        co.getDatabase();
    }
    receiveDataFromModule(response){
        this.data = response;
        this.sendDataToView(this.data);
    }

    sendDataToView(data){
        let view = new CategoryView();
        view.productDisplay(data);
    }
}