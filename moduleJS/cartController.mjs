import { Factory } from "../moduleJS/factory.mjs";
import {$,jQuery} from 'jquery';

export class CartController {
  constructor() {}
  main() {
    this.bo = Factory.cartObject();
    this.bo.add();
  }
}
