import { Product } from "@/types/Product"
import { fakeCategories } from "./fakeCategories"

const EMPTY: Product[] = []

const SMALL: Product[] = [
  {
    id: "1",
    imageSource: "https://www.tacosgratines.com/produit/2093_105.png",
    title: "Burger Maison",
    price: 5.297,
    quantity: 0,
    isAvailable: true,
    isPublicised: false,
    categories: [fakeCategories.LARGE[0]],
  },
  {
    id: "2",
    imageSource: "https://www.pjscoffee.com/uploads/iced-tea.png",
    title: "Iced Tea 25cl",
    price: 7.556,
    quantity: 0,
    isAvailable: true,
    isPublicised: false,
    categories: [fakeCategories.LARGE[1]],
  },
  {
    id: "3",
    imageSource:
      "https://img.freepik.com/photos-premium/frites-dans-emballage-papier-fond-blanc_943860-5736.jpg?semt=ais_hybrid&w=740",
    title: "Frites",
    price: 2.5,
    quantity: 0,
    isAvailable: true,
    isPublicised: false,
    categories: [fakeCategories.LARGE[4]],
  },
]

const MEDIUM: Product[] = [
  {
    id: "1",
    imageSource: "https://www.tacosgratines.com/produit/2093_105.png",
    title: "Burger Maison",
    price: 5.297,
    quantity: 0,
    isAvailable: true,
    isPublicised: false,
    categories: [fakeCategories.LARGE[0], fakeCategories.LARGE[4]],
  },
  {
    id: "2",
    imageSource: "https://www.pjscoffee.com/uploads/iced-tea.png",
    title: "Iced Tea 25cl",
    price: 7.556,
    quantity: 0,
    isAvailable: true,
    isPublicised: false,
    categories: [fakeCategories.LARGE[1]],
  },
  {
    id: "3",
    imageSource:
      "https://static.vecteezy.com/system/resources/thumbnails/046/437/566/small_2x/mix-salad-transparent-background-png.png",
    title: "Salade d'été",
    price: 7.556,
    quantity: 0,
    isAvailable: true,
    isPublicised: false,
    categories: [fakeCategories.LARGE[3]],
  },
]

const LARGE: Product[] = [
  {
    id: "1",
    imageSource: "https://www.tacosgratines.com/produit/2093_105.png",
    title: "Burger Maison",
    price: 5.297,
    quantity: 0,
    isAvailable: true,
    isPublicised: false,
    categories: [fakeCategories.LARGE[0], fakeCategories.LARGE[4]],
  },
  {
    id: "2",
    imageSource: "https://www.pjscoffee.com/uploads/iced-tea.png",
    title: "Iced Tea 25cl",
    price: 7.556,
    quantity: 0,
    isAvailable: true,
    isPublicised: false,
    categories: [fakeCategories.LARGE[1]],
  },
  {
    id: "3",
    imageSource:
      "https://static.vecteezy.com/system/resources/thumbnails/046/437/566/small_2x/mix-salad-transparent-background-png.png",
    title: "Salade d'été",
    price: 7.556,
    quantity: 0,
    isAvailable: true,
    isPublicised: false,
    categories: [fakeCategories.LARGE[3]],
  },
  {
    id: "4",
    imageSource:
      "https://png.pngtree.com/png-clipart/20240319/original/pngtree-blueberry-vanilla-ice-cream-png-image_14625229.png",
    title: "Glace myrtille",
    price: 7.556,
    quantity: 0,
    isAvailable: true,
    isPublicised: false,
    categories: [fakeCategories.LARGE[1], fakeCategories.LARGE[3]],
  },
  {
    id: "5",
    imageSource: "https://pngimg.com/uploads/snickers/snickers_PNG13936.png",
    title: "Snickers",
    price: 3.5,
    quantity: 0,
    isAvailable: true,
    isPublicised: false,
    categories: [],
  },
  {
    id: "6",
    imageSource: "/images/burger-vegan.png",
    title: "Vegan Burger",
    price: 5.4985,
    quantity: 0,
    isAvailable: true,
    isPublicised: false,
    categories: [fakeCategories.LARGE[0]],
  },
]

export const fakeProducts = {
  EMPTY,
  SMALL,
  MEDIUM,
  LARGE,
}
