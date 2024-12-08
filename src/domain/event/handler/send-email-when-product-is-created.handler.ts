import { EventHandlerInterface } from "../@shared/event-handler.interface";
import ProductCreatedEvent from "../product/product-created.event";

export default class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    console.log(`Sending email to customer: ${event.eventData.name}`);
  }
}