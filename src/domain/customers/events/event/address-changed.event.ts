import { EventInterface } from "../../../@shared/event/event.interface";
import Customer from "../../entity/customer.entity";

export class AddressChangedEvent implements EventInterface<Customer> {
  dataTimeOccurred: Date;
  eventData: Customer;

  constructor(eventData: Customer) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
