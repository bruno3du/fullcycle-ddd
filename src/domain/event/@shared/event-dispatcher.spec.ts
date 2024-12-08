import ProductCreatedEvent from "../../entity/product/event/product-created.event";
import SendEmailWhenProductIsCreatedHandler from "../../entity/product/handlers/send-email-when-product-is-created.handler";
import Product from "../../entity/product/product.entity";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should be able to register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toBe(
      eventHandler
    );
  });

  it("should be able to unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should be able to unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should be able to notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    const productCreatedEvent = new ProductCreatedEvent(
      new Product({
        id: "1",
        name: "Product 1",
        price: 10,
      })
    );

    eventDispatcher.notify(productCreatedEvent);
    expect(spyEventHandler).toHaveBeenCalledTimes(1);
    expect(eventHandler.handle).toHaveBeenCalledWith(productCreatedEvent);
  });
});
