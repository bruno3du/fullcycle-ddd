import { RepositoryInterface } from "../../@shared/repository/repository.interface";
import Product from "../entity/product-b.entity";

export interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
