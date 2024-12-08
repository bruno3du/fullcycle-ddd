import { EventInterface } from "../../../event/@shared/event.interface";
import Customer from "../customer.entity";

export class CustomerCreatedEvent implements EventInterface<Customer> {
  dataTimeOccurred: Date;
  eventData: Customer;

  constructor(eventData: Customer) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
