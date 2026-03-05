import { getProducts } from "@/api/product";
import { getLocalStorage } from "@/utils/window";
import { getCategories } from "@/api/categories";
import { BasketProductQuantity, Product } from "@/types/Product";
import { Category } from "@/types/Category";

const intialiseProducts = async (
  username: string,
  setProducts: React.Dispatch<React.SetStateAction<Product[] | undefined>>,
) => {
  const productsReceived = await getProducts(username);
  setProducts(productsReceived);
};

const intialiseBasket = (
  username: string,
  setBasket: React.Dispatch<React.SetStateAction<BasketProductQuantity[]>>,
) => {
  const basketReceived = getLocalStorage(username); // localStorage est synchrone, pas besoin de "await".
  if (basketReceived) setBasket(basketReceived as BasketProductQuantity[]);
};

const intialiseCategories = async (
  username: string,
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
) => {
  //@ts-ignore
  const categoriesReceived = await getCategories(username);
  if (categoriesReceived) {
    setCategories(categoriesReceived as Category[]);
  }
};

export const initialiseUserSession = async (
  username: string,
  setProducts: React.Dispatch<React.SetStateAction<Product[] | undefined>>,
  setBasket: React.Dispatch<React.SetStateAction<BasketProductQuantity[]>>,
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
) => {
  await intialiseProducts(username, setProducts);
  await intialiseCategories(username, setCategories);
  intialiseBasket(username, setBasket);
};
