import { ProductInterface } from "./product.interface";

type ProductProps = {
  id: string;
  name: string;
  price: number;
};

export default class ProductA implements ProductInterface {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(orderItemProps: ProductProps) {
    this._id = orderItemProps.id;
    this._name = orderItemProps.name;
    this._price = orderItemProps.price;

    this.validate();
  }

  validate() {
    if (!this._id) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }

    if (this._price < 0) {
      throw new Error("Price must be greater than 0");
    }
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  updatePrice(price: number) {
    this._price = price;
    this.validate();
  }
}
