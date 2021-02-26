import { Factory } from "../moduleJS/factory.mjs";

export class LoginController {
  constructor() {}
  main(event) {
    this.data = Factory.getEventData(event);
    this.bo = Factory.loginObject();
    this.bo.getDatabase(this.data);
  }
}
