import { Menu } from "@/types/Menu";
import { Product } from "@/types/Product";
import { findObjectById } from "@/utils/array";

import { BasketProductQuantity } from "@/types/Product";

export const getBasketItem = (
  basketItemId: BasketProductQuantity["id"],
  products: Product[] | undefined,
  menus: Menu[] | undefined,
): Product | Menu | undefined => {
  // console.log("products: ", products)
  if (products === undefined) return;
  const productFound = findObjectById(basketItemId, products); // 1. On tente de chercher le produit dans les produits
  // console.log('productFound: ', productFound)
  if (productFound)
    return productFound; // 2. Si on trouve le produit, on le retourne
  else {
    // console.log("menus: ", menus)
    if (!menus) return; // 3. Si on ne trouve pas le produit dans les produits ...
    const menuFound = findObjectById(basketItemId, menus); // 4. ... on tente alors de chercher dans les menus
    // console.log("menuFound: ", menuFound)
    return menuFound; // 5. Et si on trouve le produit dans les menus, on le retourne. Sinon, on retourne undefined (qui vient du return de la fonction findObjectById(basketProduct.id, menus))
  }
};
