import { DEFAULT_SUM_TO_PAY } from "@/enums/product";
import { BasketProductQuantity, Product } from "@/types/Product";
import { findObjectById } from "@/utils/array";
import { convertStringToBoolean } from "@/utils/string";

export const calculateSumToPay = (
  basket: BasketProductQuantity[],
  products: Product[] | undefined,
) => {
  if (products === undefined) return DEFAULT_SUM_TO_PAY;

  return basket.reduce((total, basketProductQuantity) => {
    const product = findObjectById(basketProductQuantity.id, products);

    // pas de produit trouvé (typescript)
    if (product === undefined) return total;

    // on ne veut pas afficher de NaN
    if (isNaN(product.price)) return total;

    // si le produit est en rupture de stock, alors on le retire du calcul du total à payer
    if (convertStringToBoolean(product.isAvailable) === false) return total;

    const subTotal = product.price * basketProductQuantity.quantity;

    total += subTotal;
    return total;
  }, DEFAULT_SUM_TO_PAY);
};
