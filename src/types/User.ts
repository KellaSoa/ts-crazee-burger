import { Category } from "./Category";
import { Menu } from "./Menu";
import { Product } from "./Product";

export type User = {
  products: Product[];
  username: string;
  categories: Category[];
  menus: Menu[];
};
