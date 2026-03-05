import { useState } from "react";
import { deepClone } from "@/utils/array";
//@ts-ignore
import { updateMenus } from "../api/product";
import { fakeCategories } from "@/fakeData/fakeCategories";
import { CATEGORY_ALL } from "@/enums/categories";
import { CATEGORY_MENUS } from "@/enums/menus";
import { updateCategoriesInDB } from "@/api/categories";
import { Category } from "@/types/Category";

// ensemble des catégories disponibles pour tous les produits du catalog
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>(
    fakeCategories.LARGE,
  );
  const [categoryAll, setCategoryAll] = useState<Category>(CATEGORY_ALL);
  const [categoryMenus, setCategoryMenus] = useState<Category>(CATEGORY_MENUS);

  // comportements (gestionnaire de state ou "state handlers")

  const handleAddCategory = (categoryToAdd: Category, username: string) => {
    if (!categories) return;
    // 1. copie du tableau
    const categoriesCopy = deepClone(categories);

    // 2. manip de la copie du tableau
    const categoriesUpdated = [categoryToAdd, ...categoriesCopy];

    // 3. update du state
    setCategories(categoriesUpdated);
    updateCategoriesInDB(username, categoriesUpdated);
  };
  //@ts-ignore
  const handleDeleteCategory = (
    idOfProductToDelete: string,
    username: string,
  ) => {
    if (!categories) return;
    //1. copy du state
    const menuCopy = deepClone(categories);

    //2. manip de la copie state
    const menuUpdated = menuCopy.filter(
      (product) => product.id !== idOfProductToDelete,
    );

    //3. update du state
    setCategories(menuUpdated);
    // updateMenus(username, menuUpdated)
  };

  const toggleAllCategories = () => {
    const categoriesUpdated = categories.map((category) => ({
      ...category,
      isActive: false, // Désactiver "tous les filtres produit individuels"
    }));

    setCategoryAll({ ...categoryAll, isActive: true }); // Activer "Tous"
    setCategoryMenus({ ...categoryMenus, isActive: false }); // Désactiver "Menus"
    setCategories(categoriesUpdated);
  };

  const toggleCategoryById = (idCategoryToToggle: string) => {
    const categoriesUpdated = categories.map((category) => ({
      ...category,
      isActive: category.id === idCategoryToToggle,
    }));

    setCategoryAll({ ...categoryAll, isActive: false }); // Désactiver le bouton "Tous"
    setCategoryMenus({ ...categoryMenus, isActive: false }); // Désactiver le bouton "Menus"
    setCategories(categoriesUpdated);
  };

  const toggleMenusCategory = () => {
    const isCurrentlyActive = categoryMenus.isActive ?? false; // fallback value : si jamais ça vaut undefined, "false" sera assigné au lieu de undefined.

    // Si déjà actif, on ne fait rien
    if (isCurrentlyActive) return;

    // 1. Activer la catégorie "Menus"
    setCategoryMenus({ ...categoryMenus, isActive: true });

    // 2. Désactiver toutes les autres catégories standards
    const categoriesUpdated = categories.map((category) => ({
      ...category,
      isActive: false,
    }));
    setCategories(categoriesUpdated);

    // 3. Désactiver aussi le bouton "Tous"
    setCategoryAll({ ...categoryAll, isActive: false });
  };

  //@ts-ignore
  const handleEditCategory = (
    categoryBeingEdited: Category,
    username: string,
  ) => {
    // 1. copie du state (deep clone)
    if (!categories) return;
    const menuCopy = deepClone(categories);

    // 2. manip de la copie du state
    const indexOfProductToEdit = categories.findIndex(
      (menuProduct) => menuProduct.id === categoryBeingEdited.id,
    );
    menuCopy[indexOfProductToEdit] = categoryBeingEdited;

    // 3. update du state
    setCategories(menuCopy);
    // updateMenus(username, menuCopy)
  };

  //@ts-ignore
  const resetCategories = (username: string) => {
    setCategories(fakeCategories.SMALL);
    // updateMenus(username, fakeMenu.SMALL)
  };

  return {
    categories,
    setCategories,
    handleAddCategory,
    handleDeleteCategory,
    handleEditCategory,
    resetCategories,
    toggleCategoryById,
    categoryAll,
    toggleAllCategories,
    toggleMenusCategory,
    categoryMenus,
  };
};
