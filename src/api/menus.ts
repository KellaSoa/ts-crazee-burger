import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import { Menu } from "@/types/Menu";

export const updateMenusInDB = async (userId: string, menusUpdated: Menu[]) => {
  const docRef = doc(db, "users", userId);

  await updateDoc(docRef, {
    menus: menusUpdated,
  });
};

export const getMenus = async (userId: string): Promise<Menu[] | undefined> => {
  const docRef = doc(db, "users", userId);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    const { menus } = docSnapshot.data();
    return menus as Menu[];
  }
};

// ID-693 : persistance des menus nouvellement créés : https://www.awesomescreenshot.com/video/39840001?key=e24876c666ec630bbace2cdd1c043e34
