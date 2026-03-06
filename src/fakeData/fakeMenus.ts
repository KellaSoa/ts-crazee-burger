import { Menu } from "@/types/Menu";
import { fakeCategories } from "./fakeCategories";
import { fakeProducts } from "./fakeProducts";

const EMPTY: Menu[] = [];

const SMALL: Menu[] = [
  {
    id: "1",
    title: "Groovy Menu 1",
    imageSource:
      "https://o-verruyes.fr/wp-content/uploads/2020/12/hamburger.png",
    price: 15.353,
    categories: fakeCategories.LARGE.slice(0, 3),
    quantity: 0,
    isAvailable: true,
    isPublicised: false,
    products: fakeProducts.SMALL.slice(0, 3),
  },
];

const MEDIUM: Menu[] = [
  {
    id: "1a",
    title: "Menu Burger USA",
    imageSource:
      "https://allpizzapastabuffet.fr/Montpellier/wp-content/uploads/2024/05/appb-formule-burger.png",
    price: 15.353,
    categories: fakeCategories.LARGE.slice(0, 3),
    quantity: 0,
    isAvailable: true,
    isPublicised: false,
    products: fakeProducts.SMALL.slice(0, 3),
  },
  {
    id: "2a",
    title: "Groovy Menu",
    imageSource:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAZlAOqTQtYzG7KwBizjcP6EdO_3JWSCCzWH5JGLk-y1Uk3DDdIlcKWrUMZ6eGRRM0Q_Q&usqp=CAU",
    price: 15.353,
    categories: fakeCategories.LARGE.slice(0, 1),
    quantity: 0,
    isAvailable: true,
    isPublicised: false,
    products: fakeProducts.SMALL.slice(0, 3),
  },
  {
    id: "3a",
    title: "Menu Salade",
    imageSource:
      "https://api.helpyfood.com/menus/16b3a835e95b4cc216f960cb730c6e1e.png.webp",
    price: 15.353,
    categories: fakeCategories.LARGE.slice(0, 3),
    quantity: 0,
    isAvailable: true,
    isPublicised: false,
    products: fakeProducts.SMALL.slice(0, 3),
  },
];

const LARGE: Menu[] = [
  {
    id: "1",
    title: "Groovy Menu 1",
    imageSource:
      "https://png.pngtree.com/png-clipart/20250316/original/pngtree-classic-burger-with-fries-and-drink-png-image_19458094.png",

    price: 0,
    categories: fakeCategories.LARGE.slice(0, 3),
    quantity: 0,
    isAvailable: true,
    isPublicised: false,
    products: fakeProducts.SMALL.slice(0, 3),
  },
  {
    id: "2",
    title: "Groovy Menu 2",
    imageSource:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAZlAOqTQtYzG7KwBizjcP6EdO_3JWSCCzWH5JGLk-y1Uk3DDdIlcKWrUMZ6eGRRM0Q_Q&usqp=CAU",
    price: 0,
    categories: fakeCategories.LARGE.slice(0, 3),
    quantity: 0,
    isAvailable: true,
    isPublicised: false,
    products: fakeProducts.SMALL.slice(0, 3),
  },
  {
    id: "3",
    title: "Menu Salade",
    imageSource:
      "https://api.helpyfood.com/menus/16b3a835e95b4cc216f960cb730c6e1e.png.webp",
    price: 0,
    categories: fakeCategories.LARGE.slice(0, 3),
    quantity: 0,
    isAvailable: true,
    isPublicised: false,
    products: fakeProducts.SMALL.slice(0, 3),
  },
  {
    id: "4",
    title: "Groovy Menu 4",
    imageSource:
      "https://us.123rf.com/450wm/boarding1now/boarding1now1612/boarding1now161200195/68326512-menu-hamburger-cheeseburger-et-des-frites-repas-combo-boisson-fast-food-isol%C3%A9-sur-un-fond-blanc.jpg",
    price: 0,
    categories: fakeCategories.LARGE.slice(0, 3),
    quantity: 0,
    isAvailable: true,
    isPublicised: false,
    products: fakeProducts.SMALL.slice(0, 3),
  },
  {
    id: "5",
    title: "Groovy Menu 5",
    imageSource:
      "https://us.123rf.com/450wm/boarding1now/boarding1now1612/boarding1now161200195/68326512-menu-hamburger-cheeseburger-et-des-frites-repas-combo-boisson-fast-food-isol%C3%A9-sur-un-fond-blanc.jpg",
    price: 0,
    categories: fakeCategories.LARGE.slice(0, 3),
    quantity: 0,
    isAvailable: true,
    isPublicised: false,
    products: fakeProducts.SMALL.slice(0, 3),
  },
];

export const fakeMenus = {
  EMPTY,
  SMALL,
  MEDIUM,
  LARGE,
};
