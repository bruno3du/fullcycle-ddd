import EventDispatcher from "../../@shared/event/event-dispatcher";
import { AddressChangedEvent } from "../events/event/address-changed.event";
import { CustomerCreatedEvent } from "../events/event/customer-created.event";
import EnviaConsoleLog1Handler from "../events/handlers/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "../events/handlers/envia-console-log2.handler";
import Address from "../value-object/address";
import Customer from "./customer.entity";

describe("Customer entity unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer({
        id: "",
        name: "John Doe",
        address: new Address({
          street: "Street",
          number: 123,
          zipCode: "12345",
          city: "City",
          state: "State",
        }),
      });
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer({
        id: "1",
        name: "",
        address: new Address({
          street: "Street",
          number: 123,
          zipCode: "12345",
          city: "City",
          state: "State",
        }),
      });
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    let customer = new Customer({
      id: "1",
      name: "John Paul",
      address: new Address({
        street: "Street",
        number: 123,
        zipCode: "12345",
        city: "City",
        state: "State",
      }),
    });
    expect(customer.name).toBe("John Paul");

    customer.changeName("Jane Doe");
    expect(customer.name).toBe("Jane Doe");
  });

  it("should activate customer", () => {
    let customer = new Customer({
      id: "1",
      name: "John Doe",
      address: new Address({
        street: "Street",
        number: 123,
        zipCode: "12345",
        city: "City",
        state: "State",
      }),
    });

    expect(customer.isActive).toBe(false);
    customer.activate();
    expect(customer.isActive).toBe(true);

    customer.deactivate();
    expect(customer.isActive).toBe(false);
  });

  it("should throw error when address is not defined when you activate a customer", () => {
    expect(() => {
      let customer = new Customer({
        id: "1",
        name: "John Doe",
        address: undefined,
      });
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("should deactivate customer", () => {
    let customer = new Customer({
      id: "1",
      name: "John Doe",
      address: new Address({
        street: "Street",
        number: 123,
        zipCode: "12345",
        city: "City",
        state: "State",
      }),
    });

    expect(customer.isActive).toBe(false);
    customer.activate();
    expect(customer.isActive).toBe(true);

    customer.deactivate();
    expect(customer.isActive).toBe(false);
  });

  it("should add reward points", () => {
    let customer = new Customer({
      id: "1",
      name: "John Doe",
      address: new Address({
        street: "Street",
        number: 123,
        zipCode: "12345",
        city: "City",
        state: "State",
      }),
    });

    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });

  it("should be able to change address", () => {
    let customer = new Customer({
      id: "1",
      name: "John Doe",
      address: new Address({
        street: "Street",
        number: 123,
        zipCode: "12345",
        city: "City",
        state: "State",
      }),
    });

    expect(customer.address).toBeDefined();
    customer.changeAddress(
      new Address({
        street: "Street 02",
        number: 1235,
        zipCode: "55555",
        city: "Sao Paulo",
        state: "SP",
      })
    );
    expect(customer.address).toBeDefined();
    expect(customer.address.street).toBe("Street 02");
    expect(customer.address.number).toBe(1235);
    expect(customer.address.zipCode).toBe("55555");
    expect(customer.address.city).toBe("Sao Paulo");
    expect(customer.address.state).toBe("SP");
  });

  it("should notify when a customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler01 = new EnviaConsoleLog1Handler();
    const eventHandler02 = new EnviaConsoleLog2Handler();
    const customer = new Customer({
      id: "1",
      name: "John Doe",
      address: new Address({
        street: "Street",
        number: 123,
        zipCode: "12345",
        city: "City",
        state: "State",
      }),
    });

    eventDispatcher.register("CustomerCreatedEvent", eventHandler01);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler02);

    const spyEventHandler01 = jest.spyOn(eventHandler01, "handle");
    const spyEventHandler02 = jest.spyOn(eventHandler02, "handle");

    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler01).toHaveBeenCalledTimes(1);
    expect(spyEventHandler01).toHaveBeenCalledWith(customerCreatedEvent);
    expect(spyEventHandler02).toHaveBeenCalledTimes(1);
    expect(spyEventHandler02).toHaveBeenCalledWith(customerCreatedEvent);
  });

  it("should notify when customer address is changed", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler01 = new EnviaConsoleLog1Handler();
    const eventHandler02 = new EnviaConsoleLog2Handler();
    const address = new Address({
      street: "Street",
      number: 123,
      zipCode: "12345",
      city: "City",
      state: "State",
    });
    const customer = new Customer({
      id: "1",
      name: "John Doe",
      address,
    });

    expect(customer.address).toEqual(address);

    const addressChanged = new Address({
      street: "Street 02",
      number: 1235,
      zipCode: "55555",
      city: "Sao Paulo",
      state: "SP",
    });

    customer.changeAddress(addressChanged);

    expect(customer.address).toEqual(addressChanged);

    eventDispatcher.register("AddressChangedEvent", eventHandler01);
    eventDispatcher.register("AddressChangedEvent", eventHandler02);

    const spyEventHandler01 = jest.spyOn(eventHandler01, "handle");
    const spyEventHandler02 = jest.spyOn(eventHandler02, "handle");

    const addressChangedEvent = new AddressChangedEvent(customer);

    eventDispatcher.notify(addressChangedEvent);

    expect(spyEventHandler01).toHaveBeenCalledTimes(1);
    expect(spyEventHandler01).toHaveBeenCalledWith(addressChangedEvent);
    expect(spyEventHandler02).toHaveBeenCalledTimes(1);
    expect(spyEventHandler02).toHaveBeenCalledWith(addressChangedEvent);
  });
});
