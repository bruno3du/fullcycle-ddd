import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product-b.entity";
import ProductModel from "../sequelize/model/product.model";
import ProductRepository from "./product.repository";

describe("Product repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should sequelize to be defined", async () => {
    expect(sequelize).toBeDefined();
  });

  it("product model should be added to sequelize", async () => {
    expect(sequelize.models.ProductModel).toBeDefined();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product({
      id: "1",
      name: "Product 1",
      price: 100,
    });
    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel.id).toBe("1");
    expect(productModel.name).toBe("Product 1");
    expect(productModel.price).toBe(100);
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product({
      id: "1",
      name: "Product 1",
      price: 100,
    });
    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel.id).toBe("1");
    expect(productModel.name).toBe("Product 1");

    product.changeName("Product 2");

    await productRepository.update(product);

    const productModelUpdated = await ProductModel.findOne({
      where: { id: "1" },
    });

    expect(productModelUpdated.id).toBe("1");
    expect(productModelUpdated.name).toBe("Product 2");
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product({
      id: "1",
      name: "Product 1",
      price: 100,
    });
    await productRepository.create(product);

    const productFound = await productRepository.findOne("1");

    expect(productFound.id).toBe("1");
    expect(productFound.name).toBe("Product 1");
    expect(productFound.price).toBe(100);
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product({
      id: "1",
      name: "Product 1",
      price: 100,
    });
    const product2 = new Product({
      id: "2",
      name: "Product 2",
      price: 200,
    });
    await productRepository.create(product1);
    await productRepository.create(product2);

    const products = await productRepository.findAll();

    expect(products.length).toBe(2);
    expect(products[0].id).toBe("1");
    expect(products[0].name).toBe("Product 1");
    expect(products[0].price).toBe(100);
    expect(products[1].id).toBe("2");
    expect(products[1].name).toBe("Product 2");
    expect(products[1].price).toBe(200);
  });
});
