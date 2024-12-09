import Address from "../value-object/address";
import { CustomersFactory } from "./customers.factory";

describe("Customer factory unit tests", () => {
  it("should create a customer", () => {
    const customer = CustomersFactory.create({
      name: "John Doe",
      address: new Address({
        street: "Street",
        number: 123,
        zipCode: "12345",
        city: "City",
        state: "State",
      }),
    });
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
    expect(customer.address).toEqual(customer.address);
  });

  it("should be able to create a customer without an address", () => {
    const customer = CustomersFactory.create({
      name: "John Doe",
      address: undefined,
    });
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
    expect(customer.address).toBeUndefined();
  });
});
