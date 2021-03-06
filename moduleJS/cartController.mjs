import { Factory } from "../moduleJS/factory.mjs";
export class CartController {
  constructor() {}
  main() {
    this.bo = Factory.cartObject();
    this.bo.add();
  }
}
