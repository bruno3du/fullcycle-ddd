import Product from "./product.entity";

describe("Product entity unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let product = new Product({
        id: "",
        name: "Product 1",
        price: 100,
      });
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let product = new Product({
        id: "1",
        name: "",
        price: 100,
      });
    }).toThrowError("Name is required");
  });

  it("should throw error when price is less than 0", () => {
    expect(() => {
      let product = new Product({
        id: "1",
        name: "Product 1",
        price: -1,
      });
    }).toThrowError("Price must be greater than 0");
  });

  it("should change name", () => {
    let product = new Product({
      id: "1",
      name: "Product 1",
      price: 100,
    });

    expect(product.name).toBe("Product 1");

    product.changeName("Product 2");

    expect(product.name).toBe("Product 2");
  });

  it("should be able to change price", () => {
    let product = new Product({
      id: "1",
      name: "Product 1",
      price: 100,
    });

    expect(product.price).toBe(100);

    product.updatePrice(200);

    expect(product.price).toBe(200);
  });

  it("should throw error when price is less than 0 when you update it", () => {
    expect(() => {
      let product = new Product({
        id: "1",
        name: "Product 1",
        price: 100,
      });

      product.updatePrice(-1);
    }).toThrowError("Price must be greater than 0");
  });
});
