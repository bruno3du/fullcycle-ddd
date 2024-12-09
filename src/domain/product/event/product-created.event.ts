import { EventInterface } from "../../@shared/event/event.interface";
import Product from "../entity/product-b.entity";

export default class ProductCreatedEvent implements EventInterface<Product> {
  dataTimeOccurred: Date;
  eventData: Product;

  constructor(eventData: Product) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
