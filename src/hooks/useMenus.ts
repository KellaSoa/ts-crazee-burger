import { useState } from "react";
// import { fakeProducts } from "@/fakeData/fakeProducts"
// import { deepClone } from "@/utils/array"
// import { syncBothMenus } from "../api/product"
// import { Product } from "@/types/Product"
import { Menu } from "@/types/Menu";
import { fakeMenus } from "@/fakeData/fakeMenus";
import { deepClone } from "@/utils/array";
import { updateMenusInDB } from "@/api/menus";

export const useMenus = () => {
  const [menus, setMenus] = useState<Menu[] | undefined>();

  // comportements (gestionnaire de state ou "state handlers")
  const handleAddMenu = (newMenu: Menu, username: string) => {
    if (menus) {
      // 1. copie du tableau
      const menusCopy = deepClone(menus);

      // 2. manip de la copie du tableau
      const menuUpdated = [newMenu, ...menusCopy];

      // 3. update du state
      setMenus(menuUpdated);
      updateMenusInDB(username, menuUpdated);
    }
  };

  // // ID-851 : https://www.awesomescreenshot.com/video/40286434?key=a0b569c15fa28c6f3ee8f03ff8c96f87
  const handleDeleteMenu = (idOfMenuToDelete: string, username: string) => {
    if (menus) {
      //1. copy du state
      const menuCopy = deepClone(menus);

      //2. manip de la copie state
      const menuUpdated = menuCopy.filter(
        (menu) => menu.id !== idOfMenuToDelete,
      );

      //3. update du state
      setMenus(menuUpdated);
      updateMenusInDB(username, menuUpdated);
    }
  };

  const handleMenuEdit = (menuBeingEdited: Menu, username: string) => {
    // 1. copie du state (deep clone)
    if (menus) {
      const menusCopy = deepClone(menus);

      // 2. manip de la copie du state
      const indexOfMenuToEdit = menus.findIndex(
        (menu) => menu.id === menuBeingEdited.id,
      );
      menusCopy[indexOfMenuToEdit] = menuBeingEdited;
      // 3. update du state
      setMenus(menusCopy);
      updateMenusInDB(username, menusCopy);
    }
  };

  const resetMenus = (username: string) => {
    setMenus(fakeMenus.MEDIUM);
    updateMenusInDB(username, fakeMenus.MEDIUM);
  };

  return {
    menus,
    setMenus,
    resetMenus,
    handleAddMenu,
    handleDeleteMenu,
    handleMenuEdit,
  };
};
