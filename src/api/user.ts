import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import { fakeMenu } from "@/fakeData/fakeMenu";
import { User } from "@/types/User";

/**
 * Get a user from Firestore
 * @param {string} idUser - The user's username
 * @returns {Promise<User|null>} The user data or null if not found
 */
export const getUser = async (idUser: string): Promise<User | null> => {
  const docRef = doc(db, "users", idUser);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    return docSnapshot.data() as User;
  }

  return null; // Explicitly return null if user does not exist
};

/**
 * Create a new user in Firestore
 * @param {string} userId - The username
 * @returns {Promise<object>} The newly created user
 */
export const createUser = async (userId: string): Promise<User> => {
  const docRef = doc(db, "users", userId);

  const newUser: User = {
    username: userId,
    menu: fakeMenu.SMALL,
  };

  try {
    await setDoc(docRef, newUser);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Propagate error so caller knows
  }
};

/**
 * Authenticate a user: fetch existing or create new
 * @param {string} userId
 * @returns {Promise<object>} User data
 */
export const authenticateUser = async (userId: string): Promise<User> => {
  const existingUser = await getUser(userId);

  if (!existingUser) {
    return await createUser(userId);
  }

  return existingUser as User;
};
