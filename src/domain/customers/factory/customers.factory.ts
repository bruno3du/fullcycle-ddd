import { v4 as uuid } from "uuid";
import Customer from "../entity/customer.entity";
import Address from "../value-object/address";

export class CustomersFactory {
  static create({
    name,
    address,
  }: {
    name: string;
    address: Address;
  }): Customer {
    return new Customer({ id: uuid(), name, address });
  }
}
