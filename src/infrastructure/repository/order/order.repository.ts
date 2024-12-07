import OrderItem from "../../../domain/entity/order/order-item.entity";
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
    );
  }
  async findOne(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: [OrderItemModel],
    });

    if (!orderModel) {
      throw new Error("Order not found");
    }

    return new Order({
      id: orderModel.id,
      customerId: orderModel.customerId,
      items: orderModel.items.map(
        (item) =>
          new OrderItem({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            productId: item.productId,
          })
      ),
    });
  }
  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: [OrderItemModel],
    });
    return orders.map(
      (order) =>
        new Order({
          id: order.id,
          customerId: order.customerId,
          items: order.items.map(
            (item) =>
              new OrderItem({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                productId: item.productId,
              })
          ),
        })
    );
  }
  async update(entity: Order): Promise<void> {
    const order = await OrderModel.findByPk(entity.id, {
      include: [
        {
          model: OrderItemModel,
          as: "items",
        },
      ],
    });

    if (!order) {
      throw new Error("Order not found");
    }

    await order.update({
      customerId: entity.customerId,
      total: entity.total,
    });

    // Atualize cada item associado
    for (const item of entity.items) {
      const orderItem = order.items.find((i) => i.id === item.id);
      if (orderItem) {
        await orderItem.update({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          productId: item.productId,
        });
      } else {
        // Se o item não existir, você pode optar por criar um novo
        await OrderItemModel.create({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          productId: item.productId,
          orderId: entity.id,
        });
      }
    }
  }
}
