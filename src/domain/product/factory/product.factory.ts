import { v4 as uuid } from "uuid";
import ProductA from "../entity/product-a.entity";
import ProductB from "../entity/product-b.entity";
import { ProductInterface } from "../entity/product.interface";
export default class ProductFactory {
  static create({
    type,
    name,
    price,
  }: {
    type: string;
    name: string;
    price: number;
  }): ProductInterface {
    switch (type) {
      case "a":
        return new ProductA({ id: uuid(), name, price });
      case "b":
        return new ProductB({ id: uuid(), name, price });
      default:
        throw new Error("Invalid product type");
    }
  }
}
