import { Factory } from "../moduleJS/factory.mjs";

export class OtpVerify {
  constructor() {}
  main(event) {
    this.data = Factory.getEventData(event);
    this.bo = Factory.otpObject();
    this.bo.getDatabase(this.data);
  }
}
