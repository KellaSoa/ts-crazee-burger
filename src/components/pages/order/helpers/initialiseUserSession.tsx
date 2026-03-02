import { getMenu } from "@/api/product";
import { getLocalStorage } from "@/utils/window";
import { getCategories } from "@/api/categories";
import { BasketProductQuantity, Product } from "@/types/Product";
import { Category } from "@/types/Category";

const intialiseMenu = async (
  username: string,
  setMenu: React.Dispatch<React.SetStateAction<Product[] | undefined>>,
) => {
  const menuReceived = await getMenu(username);
  setMenu(menuReceived);
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
  setMenu: React.Dispatch<React.SetStateAction<Product[] | undefined>>,
  setBasket: React.Dispatch<React.SetStateAction<BasketProductQuantity[]>>,
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
) => {
  await intialiseMenu(username, setMenu);
  await intialiseCategories(username, setCategories);
  intialiseBasket(username, setBasket);
};
