import { useState } from "react";
import { fakeProducts } from "@/fakeData/fakeProducts";
import { deepClone } from "@/utils/array";
//@ts-ignore
import { updateProducts } from "../api/product";
import { Product } from "@/types/Product";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[] | undefined>(undefined);

  // comportements (gestionnaire de state ou "state handlers")
  const handleAdd = (newProduct: Product, username: string) => {
    if (products) {
      // 1. copie du tableau
      const productsCopy = deepClone(products);

      // 2. manip de la copie du tableau
      const productsUpdated = [newProduct, ...productsCopy];

      // 3. update du state
      setProducts(productsUpdated);
      updateProducts(username, productsUpdated);
    }
  };

  const handleDelete = (idOfProductToDelete: string, username: string) => {
    if (products) {
      //1. copy du state
      const productsCopy = deepClone(products);

      //2. manip de la copie state
      const productsUpdated = productsCopy.filter(
        (product) => product.id !== idOfProductToDelete,
      );

      //3. update du state
      setProducts(productsUpdated);
      updateProducts(username, productsUpdated);
    }
  };

  const handleEdit = (productBeingEdited: Product, username: string) => {
    // 1. copie du state (deep clone)
    if (products) {
      const productsCopy = deepClone(products);

      // 2. manip de la copie du state
      const indexOfProductToEdit = products.findIndex(
        (product) => product.id === productBeingEdited.id,
      );
      productsCopy[indexOfProductToEdit] = productBeingEdited;

      // 3. update du state
      setProducts(productsCopy);
      updateProducts(username, productsCopy);
    }
  };

  const resetProducts = (username: string) => {
    setProducts(fakeProducts.MEDIUM);
    updateProducts(username, fakeProducts.LARGE);
  };

  return {
    products,
    setProducts,
    handleAdd,
    handleDelete,
    handleEdit,
    resetProducts,
  };
};
