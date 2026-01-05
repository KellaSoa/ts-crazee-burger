import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "./firebase-config"
import { Product } from "@/types/Product"

export const syncBothMenus = (userId: string, menuUpdated: Product[]) => {
  const cachette = doc(db, "users", userId)

  const nourriture = {
    username: userId,
    menu: menuUpdated,
  }
  setDoc(cachette, nourriture)
}

export const getMenu = async (idUser: string): Promise<Product[] | undefined> => {
  //const docRef = doc(CHEMIN)
  const docRef = doc(db, "users", idUser)

  const docSnapshot = await getDoc(docRef)
  if (docSnapshot.exists()) {
    const { menu } = docSnapshot.data()
    return menu as Product[]
  }
}
