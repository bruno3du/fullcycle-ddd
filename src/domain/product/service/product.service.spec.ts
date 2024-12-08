import Product from "../entity/product.entity";
import ProductService from "./product.service";

describe("Product service unit tests", () => {
  it("should change the price of all products", () => {
    const product1 = new Product({
      id: "1",
      name: "Product 1",
      price: 10,
    });

    const product2 = new Product({
      id: "2",
      name: "Product 2",
      price: 20,
    });

    const products = [product1, product2];

    ProductService.increasePricePercentage(products, 100);

    expect(product1.price).toBe(20);
    expect(product2.price).toBe(40);
  });
});
