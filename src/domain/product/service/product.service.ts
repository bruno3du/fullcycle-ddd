import Product from "../entity/product.entity";

export default class ProductService {
  static increasePricePercentage(
    products: Product[],
    percentage: number
  ): Product[] {
    products.forEach((product) => {
      product.updatePrice(product.price * (1 + percentage / 100));
    });

    return products;
  }
}
