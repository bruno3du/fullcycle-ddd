import { Sequelize } from "sequelize-typescript";
import Address from "../../../domain/entity/address";
import Customer from "../../../domain/entity/customer/customer.entity";
import CustomerModel from "../../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should sequelize to be defined", async () => {
    expect(sequelize).toBeDefined();
  });

  it("customer model should be added to sequelize", async () => {
    expect(sequelize.models.CustomerModel).toBeDefined();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
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
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel.id).toBe("1");
    expect(customerModel.name).toBe("Customer 1");
    expect(customerModel.street).toBe("Street 1");
    expect(customerModel.number).toBe(1);
    expect(customerModel.zipCode).toBe("Zipcode 1");
    expect(customerModel.city).toBe("City 1");
    expect(customerModel.active).toBe(false);
    expect(customerModel.rewardPoints).toBe(0);
  });

  it("should throw error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.findOne("1");
    }).rejects.toThrow("Customer not found");
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
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
    await customerRepository.create(customer);

    const customerFound = await customerRepository.findOne("1");

    expect(customerFound.id).toBe("1");
    expect(customerFound.name).toBe("Customer 1");
    expect(customerFound.address.street).toBe("Street 1");
    expect(customerFound.address.number).toBe(1);
    expect(customerFound.address.zipCode).toBe("Zipcode 1");
    expect(customerFound.address.city).toBe("City 1");
    expect(customerFound.address.state).toBe("State 1");
    expect(customerFound.isActive).toBe(false);
    expect(customerFound.rewardPoints).toBe(0);
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
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
    await customerRepository.create(customer);

    const customers = await customerRepository.findAll();

    expect(customers.length).toBe(1);
    expect(customers[0].id).toBe("1");
    expect(customers[0].name).toBe("Customer 1");
    expect(customers[0].address.street).toBe("Street 1");
    expect(customers[0].address.number).toBe(1);
    expect(customers[0].address.zipCode).toBe("Zipcode 1");
    expect(customers[0].address.city).toBe("City 1");
    expect(customers[0].address.state).toBe("State 1");
    expect(customers[0].isActive).toBe(false);
    expect(customers[0].rewardPoints).toBe(0);
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
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
    await customerRepository.create(customer);

    const customerUpdated = new Customer({
      id: "1",
      name: "Customer 2",
      address: new Address({
        street: "Street 2",
        number: 2,
        zipCode: "Zipcode 2",
        city: "City 2",
        state: "State 2",
      }),
    });
    await customerRepository.update(customerUpdated);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel.id).toBe("1");
    expect(customerModel.name).toBe("Customer 2");
    expect(customerModel.street).toBe("Street 2");
    expect(customerModel.number).toBe(2);
    expect(customerModel.zipCode).toBe("Zipcode 2");
    expect(customerModel.city).toBe("City 2");
    expect(customerModel.active).toBe(false);
    expect(customerModel.rewardPoints).toBe(0);
  });
});
