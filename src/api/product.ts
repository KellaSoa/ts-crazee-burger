import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import { Product } from "@/types/Product";

export const updateProducts = async (
  userId: string,
  productsUpdated: Product[],
) => {
  const cachette = doc(db, "users", userId);

  const nourriture = {
    products: productsUpdated,
  };
  //setDoc(cachette, nourriture)
  await updateDoc(cachette, nourriture);
};

export const getProducts = async (
  idUser: string,
): Promise<Product[] | undefined> => {
  //const docRef = doc(CHEMIN)
  const docRef = doc(db, "users", idUser);

  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    const { products } = docSnapshot.data();
    return products as Product[];
  }
};
