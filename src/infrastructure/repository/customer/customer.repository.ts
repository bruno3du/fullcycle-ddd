import Address from "../../../domain/entity/address";
import Customer from "../../../domain/entity/customer/customer.entity";
import CustomerRepositoryInterface from "../../../domain/repository/customer.repository";
import CustomerModel from "../../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipCode: entity.address.zipCode,
      city: entity.address.city,
      state: entity.address.state,
      rewardPoints: entity.rewardPoints,
      active: entity.isActive,
    });
  }
  async findOne(id: string): Promise<Customer> {
    const customer = await CustomerModel.findByPk(id).catch(() => null);

    if (!customer) {
      throw new Error("Customer not found");
    }

    const customerFound = new Customer({
      id: customer.id,
      name: customer.name,
      address: new Address({
        street: customer.street,
        number: customer.number,
        zipCode: customer.zipCode,
        city: customer.city,
        state: customer.state,
      }),
    });

    customerFound.addRewardPoints(customer.rewardPoints);

    if (customer.active) {
      customerFound.activate();
    }

    return customerFound;
  }
  async findAll(): Promise<Customer[]> {
    const customers = await CustomerModel.findAll();

    return customers.map((product) => {
      const customer = new Customer({
        id: product.id,
        name: product.name,
        address: new Address({
          street: product.street,
          number: product.number,
          zipCode: product.zipCode,
          city: product.city,
          state: product.state,
        }),
      });

      customer.addRewardPoints(product.rewardPoints);

      if (product.active) {
        customer.activate();
      }

      return customer;
    });
  }
  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zipCode: entity.address.zipCode,
        city: entity.address.city,
        state: entity.address.state,
        rewardPoints: entity.rewardPoints,
        active: entity.isActive,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }
}
