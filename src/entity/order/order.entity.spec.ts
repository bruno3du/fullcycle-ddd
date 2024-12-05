import OrderItem from "./order-item.entity";
import Order from "./order.entity";

describe("Order entity unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order({
        id: "",
        customerId: "1",
        items: [],
      });
    }).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      let order = new Order({
        id: "1",
        customerId: "",
        items: [],
      });
    }).toThrowError("CustomerId is required");
  });

  it("should throw error when items is empty", () => {
    expect(() => {
      let order = new Order({
        id: "1",
        customerId: "1",
        items: [],
      });
    }).toThrowError("Items are required");
  });

  it("should throw error quantity of order item is greater than 0", () => {
    expect(() => {
      new OrderItem({
        id: "1",
        name: "Product 1",
        price: 100,
        productId: "1",
        quantity: -1,
      });
    }).toThrowError("Quantity must be greater than 0");
  });

  it("should calculate total", () => {
    const item01 = new OrderItem({
      id: "1",
      name: "Product 1",
      price: 100,
      productId: "1",
      quantity: 2,
    });

    const item02 = new OrderItem({
      id: "2",
      name: "Product 2",
      price: 200,
      productId: "2",
      quantity: 3,
    });

    const order = new Order({
      id: "1",
      customerId: "1",
      items: [item01, item02],
    });

    expect(order.total).toBe(800);
  });
});
