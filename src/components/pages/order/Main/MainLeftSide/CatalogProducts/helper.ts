import { Category } from "@/types/Category";
import { Product } from "@/types/Product";

export const checkIfProductIsClicked = (
  idProductInList: string,
  idProductClickedOn: string,
): boolean => {
  return idProductInList === idProductClickedOn;
};

export const getProductsToDisplay = (
  categoryAll: Category,
  products: Product[],
  activeCategory: Category | undefined,
) => {
  const productsToDisplayed = categoryAll.isActive
    ? products
    : products.filter(({ categories: categoriesFromProducts }) =>
        categoriesFromProducts?.some(
          (categoriesFromProduct) =>
            categoriesFromProduct.label === activeCategory?.label,
        ),
      );
  return productsToDisplayed;
};
