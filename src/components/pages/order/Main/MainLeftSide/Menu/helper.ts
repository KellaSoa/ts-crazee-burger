import { Category } from "@/types/Category";
import { Product } from "@/types/Product";

export const checkIfProductIsClicked = (
  idProductInMenu: string,
  idProductClickedOn: string
): boolean => {
  return idProductInMenu === idProductClickedOn;
};

export const getProductsToDisplay = (
  categoryAll: Category,
  products: Product[],
  activeCategory: Category
) => {
  const productsToDisplayed = categoryAll.isActive
    ? products
    : products.filter(({ categories: categoriesFromMenu }) =>
        categoriesFromMenu?.some(
          (categoryFromMenu) => categoryFromMenu.label === activeCategory?.label
        )
      );
  return productsToDisplayed;
};
