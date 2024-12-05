import OrderItem from "./order-item.entity";

type OrderProps = {
  id: string;
  customerId: string;
  items: OrderItem[];
};

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(orderProps: OrderProps) {
    this._id = orderProps.id;
    this._customerId = orderProps.customerId;
    this._items = orderProps.items;
    this._total = this.calculateTotal();

    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._customerId.length === 0) {
      throw new Error("CustomerId is required");
    }
    if (this._items.length === 0) {
      throw new Error("Items are required");
    }
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get total(): number {
    return this._total;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  calculateTotal(): number {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
  }
}
