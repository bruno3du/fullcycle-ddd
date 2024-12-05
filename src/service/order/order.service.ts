import Order from "../../entity/order/order.entity";

export default class OrderService {
  static calculateTotal(order: Order[]): number {
    return order.reduce((acc, order) => acc + order.total, 0);
  }
}
