import { EventInterface } from "../../../event/@shared/event.interface";
import Product from "../product.entity";

export default class ProductCreatedEvent implements EventInterface<Product> {
  dataTimeOccurred: Date;
  eventData: Product;

  constructor(eventData: Product) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
