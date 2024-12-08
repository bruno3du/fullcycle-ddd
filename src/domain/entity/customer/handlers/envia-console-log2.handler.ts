import { EventHandlerInterface } from "../../../event/@shared/event-handler.interface";
import { AddressChangedEvent } from "../event/address-changed.event";
import { CustomerCreatedEvent } from "../event/customer-created.event";

export default class EnviaConsoleLog2Handler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log(`Esse é o segundo console.log do evento: CustomerCreated`);
  }
}
