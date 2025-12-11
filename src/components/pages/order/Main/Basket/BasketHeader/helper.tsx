import { BasketProductQuantity, MenuProduct } from "@/types/Product";
import { findObjectById } from "@/utils/array";
import { convertStringToBoolean } from "@/utils/string";

export const calculateSumToPay = (
  basket: BasketProductQuantity[],
  menu: MenuProduct[] | undefined
) => {
  return basket.reduce((total, basketProduct) => {
    const menuProduct = findObjectById(basketProduct.id, menu!);
    if (isNaN(menuProduct!.price)) return total;
    if (convertStringToBoolean(menuProduct!.isAvailable) === false)
      return total;
    total += menuProduct!.price * basketProduct.quantity;
    return total;
  }, 0);
};
