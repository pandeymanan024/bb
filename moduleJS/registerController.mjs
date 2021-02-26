import { Factory } from "../moduleJS/factory.mjs";

export class RegisterController {
  constructor() {
    this.dataObj;
    this.data;
  }

  main(event) {
    this.data = Factory.getEventData(event);
    this.bo = Factory.registerObject();
    this.bo.getDatabase(this.data);
  }
}
