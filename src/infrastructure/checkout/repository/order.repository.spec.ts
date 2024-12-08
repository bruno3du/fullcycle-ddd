import { Sequelize } from "sequelize-typescript";
import OrderItem from "../../../domain/checkout/order/entity/order-item.entity";
import Order from "../../../domain/checkout/order/entity/order.entity";
import Customer from "../../../domain/customers/entity/customer.entity";
import Address from "../../../domain/customers/value-object/address";
import Product from "../../../domain/product/entity/product.entity";
import CustomerModel from "../../customer/sequelize/model/customer.model";
import ProductModel from "../../product/sequelize/model/product.model";
import OrderItemModel from "../sequelize/model/order-item.model";
import OrderModel from "../sequelize/model/order.model";
import OrderRepository from "./order.repository";

describe("Order repository tests", () => {
  let sequelize: Sequelize;
  let customer: Customer;
  let product01: Product;
  let product02: Product;

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

    product01 = new Product({
      id: "1",
      name: "Product 1",
      price: 10,
    });

    product02 = new Product({
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

    customer = new Customer({
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

  it("should find an order", async () => {
    const orderRepository = new OrderRepository();

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

    await OrderModel.create(
      {
        id: order.id,
        customerId: order.customerId,
        total: order.total,
        items: order.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          productId: item.productId,
          orderId: order.id,
        })),
      },
      {
        include: [OrderItemModel],
      }
    );

    const orderFound = await orderRepository.findOne(order.id);

    expect(orderFound.id).toBe(order.id);
    expect(orderFound.customerId).toBe(order.customerId);
    expect(orderFound.items.length).toBe(order.items.length);
    expect(orderFound.items[0].id).toBe(order.items[0].id);
    expect(orderFound.items[0].name).toBe(order.items[0].name);
    expect(orderFound.items[0].price).toBe(order.items[0].price);
    expect(orderFound.items[0].quantity).toBe(order.items[0].quantity);
    expect(orderFound.items[0].productId).toBe(order.items[0].productId);
    expect(orderFound.items[1].id).toBe(order.items[1].id);
    expect(orderFound.items[1].name).toBe(order.items[1].name);
    expect(orderFound.items[1].price).toBe(order.items[1].price);
    expect(orderFound.items[1].quantity).toBe(order.items[1].quantity);
    expect(orderFound.items[1].productId).toBe(order.items[1].productId);
  });

  it("should throw error when order is not found", async () => {
    const orderRepository = new OrderRepository();
    await expect(orderRepository.findOne("1")).rejects.toThrow(
      "Order not found"
    );
  });

  it("should find all orders", async () => {
    const orderRepository = new OrderRepository();

    const order01 = new Order({
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

    const order02 = new Order({
      id: "2",
      customerId: customer.id,
      items: [
        new OrderItem({
          id: "3",
          name: product01.name,
          price: 10,
          quantity: 1,
          productId: product01.id,
        }),
        new OrderItem({
          id: "4",
          name: product02.name,
          price: 20,
          quantity: 2,
          productId: product02.id,
        }),
      ],
    });

    await OrderModel.bulkCreate(
      [
        {
          id: order01.id,
          customerId: order01.customerId,
          total: order01.total,
          items: order01.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            productId: item.productId,
            orderId: order01.id,
          })),
        },
        {
          id: order02.id,
          customerId: order02.customerId,
          total: order02.total,
          items: order02.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            productId: item.productId,
            orderId: order02.id,
          })),
        },
      ],
      {
        include: [
          {
            model: OrderItemModel,
            as: "items",
          },
        ],
      }
    );

    const orders = await orderRepository.findAll();

    expect(orders.length).toBe(2);
    expect(orders[0].id).toBe(order01.id);
    expect(orders[0]).toEqual(order01);
    expect(orders[1].id).toBe(order02.id);
    expect(orders[1]).toEqual(order02);
  });

  it("should update an order", async () => {
    const orderRepository = new OrderRepository();

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

    await OrderModel.create(
      {
        id: order.id,
        customerId: order.customerId,
        total: order.total,
        items: order.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          productId: item.productId,
          orderId: order.id,
        })),
      },
      {
        include: [OrderItemModel],
      }
    );

    order.addItem(
      new OrderItem({
        id: "3",
        name: product01.name,
        price: 10,
        quantity: 1,
        productId: product01.id,
      })
    );

    await orderRepository.update(order);

    const orderModel = await OrderModel.findByPk(order.id, {
      include: [OrderItemModel],
    });

    expect(orderModel.id).toBe(order.id);
    expect(orderModel.customerId).toBe(order.customerId);
    expect(orderModel.items.length).toBe(order.items.length);
    expect(orderModel.total).toBe(order.total);
  });
});
