import { RepositoryInterface } from "../../@shared/repository/repository.interface";
import Product from "../entity/product.entity";

export interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
