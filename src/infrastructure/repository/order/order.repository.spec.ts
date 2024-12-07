import { Sequelize } from "sequelize-typescript";
import Address from "../../../domain/entity/address";
import Customer from "../../../domain/entity/customer/customer.entity";
import OrderItem from "../../../domain/entity/order/order-item.entity";
import Order from "../../../domain/entity/order/order.entity";
import Product from "../../../domain/entity/product/product.entity";
import CustomerModel from "../../db/sequelize/model/customer.model";
import OrderItemModel from "../../db/sequelize/model/order-item.model";
import OrderModel from "../../db/sequelize/model/order.model";
import ProductModel from "../../db/sequelize/model/product.model";
import OrderRepository from "./order.repository";

describe("Order repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      OrderModel,
      OrderItemModel,
      CustomerModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should sequelize to be defined", async () => {
    expect(sequelize).toBeDefined();
  });

  it("models order, orderitem, customer and product should be added to sequelize", async () => {
    expect(sequelize.models.OrderModel).toBeDefined();
    expect(sequelize.models.OrderItemModel).toBeDefined();
    expect(sequelize.models.CustomerModel).toBeDefined();
    expect(sequelize.models.ProductModel).toBeDefined();
  });

  it("should create an order", async () => {
    const orderRepository = new OrderRepository();
    const product01 = new Product({
      id: "1",
      name: "Product 1",
      price: 10,
    });

    const product02 = new Product({
      id: "2",
      name: "Product 2",
      price: 20,
    });

    await ProductModel.bulkCreate([
      {
        id: product01.id,
        name: product01.name,
        price: product01.price,
      },
      {
        id: product02.id,
        name: product02.name,
        price: product02.price,
      },
    ]);

    await expect(ProductModel.findAll()).resolves.toHaveLength(2);

    const customer = new Customer({
      id: "1",
      name: "Customer 1",
      address: new Address({
        street: "Street 1",
        number: 1,
        zipCode: "Zipcode 1",
        city: "City 1",
        state: "State 1",
      }),
    });

    await expect(CustomerModel.findAll()).resolves.toHaveLength(0);

    await CustomerModel.create({
      id: customer.id,
      name: customer.name,
      street: customer.address.street,
      number: customer.address.number,
      zipCode: customer.address.zipCode,
      city: customer.address.city,
      state: customer.address.state,
      rewardPoints: customer.rewardPoints,
      active: customer.isActive,
    });

    await expect(CustomerModel.findAll()).resolves.toHaveLength(1);

    const order = new Order({
      id: "1",
      customerId: customer.id,
      items: [
        new OrderItem({
          id: "1",
          name: product01.name,
          price: 10,
          quantity: 1,
          productId: product01.id,
        }),
        new OrderItem({
          id: "2",
          name: product02.name,
          price: 20,
          quantity: 2,
          productId: product02.id,
        }),
      ],
    });

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: [OrderItemModel],
    });

    expect(orderModel.id).toBe(order.id);
    expect(orderModel.customerId).toBe(order.customerId);
    expect(orderModel.items.length).toBe(order.items.length);
    expect(orderModel.items[0].id).toBe(order.items[0].id);
    expect(orderModel.items[0].name).toBe(order.items[0].name);
    expect(orderModel.items[0].price).toBe(order.items[0].price);
    expect(orderModel.items[0].quantity).toBe(order.items[0].quantity);
    expect(orderModel.items[0].productId).toBe(order.items[0].productId);
    expect(orderModel.items[1].id).toBe(order.items[1].id);
    expect(orderModel.items[1].name).toBe(order.items[1].name);
    expect(orderModel.items[1].price).toBe(order.items[1].price);
    expect(orderModel.items[1].quantity).toBe(order.items[1].quantity);
    expect(orderModel.items[1].productId).toBe(order.items[1].productId);
  });
});
