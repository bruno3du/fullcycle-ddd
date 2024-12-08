import { RepositoryInterface } from "../../@shared/repository/repository.interface";
import Customer from "../entity/customer.entity";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
