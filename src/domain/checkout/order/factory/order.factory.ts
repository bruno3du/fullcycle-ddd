import { v4 as uuid } from "uuid";
import OrderItem from "../entity/order-item.entity";
import Order from "../entity/order.entity";

interface OrderFactoryInputProps {
  id?: string;
  customerId: string;
  items: any[];
}

interface OrderFactoryOutputProps {
  id: string;
  customerId: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    productId: string;
  }>;
}
export class OrderFactory {
  static create(props: OrderFactoryInputProps): OrderFactoryOutputProps {
    const order = new Order({
      id: props.id ?? uuid(),
      customerId: props.customerId,
      items: props.items?.map((ele) => new OrderItem(ele)),
    });

    return {
      id: order.id,
      customerId: order.customerId,
      items: order.items.map((item) => ({
        id: item.id ?? uuid(),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        productId: item.productId,
      })),
    };
  }
}
