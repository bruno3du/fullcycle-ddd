import { v4 as uuid } from "uuid";
import Customer from "../../../customers/entity/customer.entity";
import OrderItem from "../entity/order-item.entity";
import Order from "../entity/order.entity";

export default class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error("Order must have at least one item");
    }

    const order = new Order({
      customerId: customer.id,
      id: uuid(),
      items,
    });

    customer.addRewardPoints(order.total / 2);

    return order;
  }
  static calculateTotal(order: Order[]): number {
    return order.reduce((acc, order) => acc + order.total, 0);
  }
}
