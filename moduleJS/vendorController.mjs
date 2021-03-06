import { Factory } from "../moduleJS/factory.mjs";

export class AddProduct{
    constructor(){}
    main(event){
        let formData = Factory.getMediaData();
        let imageObject = Factory.imageStoreObject();
        if (formData.lenght === undefined){
            imageObject.getDatabaseEmptyImage();
        }
        else{
            imageObject.getDatabase(formData);
        }
    }
}