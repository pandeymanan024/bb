import { Factory } from "../moduleJS/factory.mjs";



export class ForgotController {
  constructor() {}
  main(event) {
    this.data = Factory.getEventData(event);
    this.fo = Factory.forgotObject();
    this.fo.otpGenerator(this.data);
  }
}
