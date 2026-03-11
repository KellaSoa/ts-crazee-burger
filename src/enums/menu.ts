import { theme } from "@/theme/theme"
import { Category } from "@/types/Category"
import { Menu } from "@/types/Menu"
import { Product } from "@/types/Product"

export const CATEGORY_MENUS: Category = {
  id: "id-category-products",
  label: "Menus",
  color: theme.colors.purple,
  iconName: "menu",
  isActive: false,
}

// @TODO : rename à EMPTY_MENU
export const EMPTY_MENU: Menu = {
  id: "", // faut le laisser à string vide sinon avec "0" ou "1", son id sera égal à un menu existant et la carte sera en primary / orange par défaut.
  title: "",
  imageSource: "",
  price: 0,
  categories: [],
  isAvailable: true,
  isPublicised: false,
  products: [],
}

export const DEFAULT_MENU: Product = {
  id: "",
  title: "Nouveau produit",
  imageSource: "https://img.freepik.com/photos-gratuite/tasse-cafe-vapeur-table_1373-58.jpg",
  price: 2.5,
  isAvailable: true,
  isPublicised: false,
}
