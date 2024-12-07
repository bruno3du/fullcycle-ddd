import Address from "../address";
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
});
