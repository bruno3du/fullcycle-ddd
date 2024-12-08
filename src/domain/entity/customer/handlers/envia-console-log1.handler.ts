import { EventHandlerInterface } from "../../../event/@shared/event-handler.interface";
import { AddressChangedEvent } from "../event/address-changed.event";
import { CustomerCreatedEvent } from "../event/customer-created.event";

export default class EnviaConsoleLog1Handler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log(
      `Esse é o primeiro console.log do evento: CustomerCreated`,
      event.eventData.address.toString()
    );
  }
}
