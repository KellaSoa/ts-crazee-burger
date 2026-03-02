import { Category } from "./Category";
import { Product } from "./Product";

export type User = {
  menu: Product[];
  username: string;
  categories: Category[];
};
