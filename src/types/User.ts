import { Category } from "./Category";
import { Product } from "./Product";

export type User = {
  products: Product[];
  username: string;
  categories: Category[];
};
