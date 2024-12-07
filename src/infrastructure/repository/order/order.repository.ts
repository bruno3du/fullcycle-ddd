import Order from "../../../domain/entity/order/order.entity";
import { OrderRepositoryInterface } from "../../../domain/repository/order.repository";
import OrderItemModel from "../../db/sequelize/model/order-item.model";
import OrderModel from "../../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total,
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          productId: item.productId,
          orderId: entity.id,
        })),
      },
      {
        include: [OrderItemModel],
      }
    ).catch((error) => {
      console.log(error);
    });
  }
  findOne(id: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
  update(entity: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
