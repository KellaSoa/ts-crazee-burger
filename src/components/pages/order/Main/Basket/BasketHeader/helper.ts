import { DEFAULT_SUM_TO_PAY } from "@/enums/product";
import { BasketProductQuantity, Product } from "@/types/Product";
import { findObjectById } from "@/utils/array";
import { convertStringToBoolean } from "@/utils/string";

export const calculateSumToPay = (
  basket: BasketProductQuantity[],
  menu: Product[] | undefined
) => {
  if (menu === undefined) return DEFAULT_SUM_TO_PAY;

  return basket.reduce((total, basketProductQuantity) => {
    const menuProduct = findObjectById(basketProductQuantity.id, menu);

    // pas de produit trouvé (typescript)
    if (menuProduct === undefined) return total;

    // on ne veut pas afficher de NaN
    if (isNaN(menuProduct.price)) return total;

    // si le produit est en rupture de stock, alors on le retire du calcul du total à payer
    if (convertStringToBoolean(menuProduct.isAvailable) === false) return total;

    const subTotal = menuProduct.price * basketProductQuantity.quantity;

    total += subTotal;
    return total;
  }, DEFAULT_SUM_TO_PAY);
};
