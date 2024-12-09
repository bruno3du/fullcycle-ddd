import { v4 as uuid } from "uuid";
import { OrderFactory } from "./order.factory";

describe("Customer factory unit tests", () => {
  it("should create a order", () => {
    const orderProps = {
      id: uuid(),
      customerId: "1",
      items: [
        {
          id: uuid(),
          name: "Product 1",
          price: 100,
          quantity: 2,
          productId: "1",
        },
      ],
    };
    const order = OrderFactory.create(orderProps);
    expect(order.id).toEqual(orderProps.id);
    expect(order.customerId).toBe("1");
    expect(order.items).toEqual(expect.arrayContaining(orderProps.items));
    expect(order.items).toHaveLength(1);
  });
});
