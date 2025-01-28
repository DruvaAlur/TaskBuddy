import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_Firebase_Api_Key,
  authDomain: import.meta.env.VITE_Firebase_Auth_Domain,
  projectId: import.meta.env.VITE_Firebase_Project_Id,
  storageBucket: import.meta.env.VITE_Firebase_Storage_Bucket,
  messagingSenderId: import.meta.env.VITE_Firebase_Messaging_Sender_Id,
  appId: import.meta.env.VITE_Firebase_App_Id,
  measurementId: import.meta.env.VITE_Firebase_Measurement_Id,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User Info:", user);
    return user;
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw error;
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error during sign-out:", error);
  }
};

export { auth, signInWithGoogle, logout, db, provider };
