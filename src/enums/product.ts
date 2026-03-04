import { fakeCategories } from "@/fakeData/fakeCategories";
import { Product } from "@/types/Product";

export const EMPTY_PRODUCT: Product = {
  id: "",
  title: "",
  imageSource: "",
  price: 0,
  isAvailable: true,
  isPublicised: false,
  categories: fakeCategories.SMALL,
};

export const IMAGE_COMING_SOON = "/images/coming-soon.png";
export const IMAGE_NO_STOCK = "/images/stock-epuise.png";

export const BASKET_MESSAGE = {
  EMPTY: "Votre commande est vide.",
  LOADING: "Chargement en cours...",
  NOT_AVAILABLE: "Non disponible",
} as const;

export const DEFAULT_SUM_TO_PAY = 0;
