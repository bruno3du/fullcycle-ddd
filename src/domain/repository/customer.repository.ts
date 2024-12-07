import Customer from "../entity/customer/customer.entity";
import { RepositoryInterface } from "./repository.interface";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
