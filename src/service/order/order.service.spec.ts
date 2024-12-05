import OrderItem from "../../entity/order/order-item.entity";
import Order from "../../entity/order/order.entity";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
  it("should calculate total of all orders", () => {
    const item1 = new OrderItem({
      id: "1",
      name: "Product 1",
      price: 100,
      quantity: 2,
      productId: "1",
    });

    const item2 = new OrderItem({
      id: "2",
      name: "Product 2",
      price: 50,
      quantity: 1,
      productId: "2",
    });

    const order1 = new Order({
      id: "1",
      customerId: "1",
      items: [item1],
    });

    const order2 = new Order({
      id: "2",
      customerId: "1",
      items: [item2],
    });

    const orders = [order1, order2];

    const total = OrderService.calculateTotal(orders);

    expect(total).toBe(250);
  });
});
