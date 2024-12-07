import Order from "../entity/order/order.entity";
import { RepositoryInterface } from "./repository.interface";

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {}
