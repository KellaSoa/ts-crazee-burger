import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import { Category } from "@/types/Category";

export const getCategories = async (
  idUser: string
): Promise<Category[] | undefined> => {
  //const docRef = doc(CHEMIN)
  const docRef = doc(db, "users", idUser);

  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    const { categories } = docSnapshot.data();
    return categories as Category[];
  }
};

export const updateCategoriesInDB = async (
  userId: string,
  categoriesUpdated: Category[]
) => {
  const docRef = doc(db, "users", userId);

  await updateDoc(docRef, {
    categories: categoriesUpdated,
  });
};
