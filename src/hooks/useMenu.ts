import { useState } from "react"
import { fakeMenu } from "@/fakeData/fakeMenu"
import { deepClone } from "@/utils/array"
//@ts-ignore
import { syncBothMenus } from "../api/product"
import { Product } from "@/types/Product"

export const useMenu = () => {
  const [menu, setMenu] = useState<Product[] | undefined>()

  // comportements (gestionnaire de state ou "state handlers")
  const handleAdd = (newProduct: Product, username: string) => {
    if (menu) {
      // 1. copie du tableau
      const menuCopy = deepClone(menu)

      // 2. manip de la copie du tableau
      const menuUpdated = [newProduct, ...menuCopy]

      // 3. update du state
      setMenu(menuUpdated)
      syncBothMenus(username, menuUpdated)
    }
  }

  const handleDelete = (idOfProductToDelete: string, username: string) => {
    if (menu) {
      //1. copy du state
      const menuCopy = deepClone(menu)

      //2. manip de la copie state
      const menuUpdated = menuCopy.filter((product) => product.id !== idOfProductToDelete)

      //3. update du state
      setMenu(menuUpdated)
      syncBothMenus(username, menuUpdated)
    }
  }

  const handleEdit = (productBeingEdited: Product, username: string) => {
    // 1. copie du state (deep clone)
    if (menu) {
      const menuCopy = deepClone(menu)

      // 2. manip de la copie du state
      const indexOfProductToEdit = menu.findIndex(
        (menuProduct) => menuProduct.id === productBeingEdited.id
      )
      menuCopy[indexOfProductToEdit] = productBeingEdited

      // 3. update du state
      setMenu(menuCopy)
      syncBothMenus(username, menuCopy)
    }
  }

  const resetMenu = (username: string) => {
    setMenu(fakeMenu.MEDIUM)
    syncBothMenus(username, fakeMenu.LARGE)
  }

  return { menu, setMenu, handleAdd, handleDelete, handleEdit, resetMenu }
}
