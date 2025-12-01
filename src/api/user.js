import { doc, getDoc, setDoc, enableNetwork } from "firebase/firestore";
import { db } from "./firebase-config";
import { fakeMenu } from "../fakeData/fakeMenu";

/**
 * Get a user from Firestore
 * @param {string} idUser - The user's username
 * @returns {Promise<object|null>} The user data or null if not found
 */
export const getUser = async (idUser) => {
  try {
    // Ensure Firestore is online (prevents "client is offline" in Vite)
    await enableNetwork(db);

    const docRef = doc(db, "users", idUser);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data();
    }

    return null; // Explicitly return null if user does not exist
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

/**
 * Create a new user in Firestore
 * @param {string} userId - The username
 * @returns {Promise<object>} The newly created user
 */
export const createUser = async (userId) => {
  const docRef = doc(db, "users", userId);

  const newUser = {
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
export const authenticateUser = async (userId) => {
  const existingUser = await getUser(userId);

  if (!existingUser) {
    return await createUser(userId);
  }

  return existingUser;
};
