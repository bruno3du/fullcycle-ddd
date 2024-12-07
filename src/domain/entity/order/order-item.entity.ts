type OrderItemProps = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity?: number;
};

export default class OrderItem {
  private _id: string;
  private _productId: string;
  private _name: string;
  private _price: number;
  private _quantity: number;

  constructor(orderItemProps: OrderItemProps) {
    this._id = orderItemProps.id;
    this._name = orderItemProps.name;
    this._price = orderItemProps.price;
    this._quantity = orderItemProps.quantity || 1;
    this._productId = orderItemProps.productId;

    this.validate();
  }
  validate() {
    if (this._price <= 0) {
      throw new Error("Price must be greater than 0");
    }

    if (this._quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }
  }
  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get quantity(): number {
    return this._quantity;
  }

  get productId(): string {
    return this._productId;
  }

  orderItemTotal(): number {
    return this._price * this._quantity;
  }

  get price(): number {
    return this._price;
  }
}
