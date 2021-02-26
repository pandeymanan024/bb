import { Factory } from "../moduleJS/factory.mjs";

export class AddProduct{
    constructor(){

    }
    main(event){
        let formData = Factory.getMediaData();
        let imageObject = Factory.imageStoreObject();
        imageObject.getDatabase(formData);
    }
}