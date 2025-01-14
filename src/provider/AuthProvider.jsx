import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase/firebase.init";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  //sign Up user
  const signUpUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //sign In user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //google login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  //signOut
  const signOutUser = () => {
    return signOut(auth);
  };

  //update profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  //onAuthStateChanged
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser?.email) {
        setUser(currentUser);

        try {
          // Request JWT token from backend
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            { email: currentUser.email }
          );

          if (data.token) {
            localStorage.setItem("access-token", data.token); // Store token
          }
        } catch (error) {
          console.error("Failed to fetch JWT token:", error);
          localStorage.removeItem("access-token"); // Clear token on failure
        }
      } else {
        // No user logged in, clear token
        setUser(null);
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });
    return () => {
      unSub();
    };
  }, []);

  const authInfo = {
    googleLogin,
    signInUser,
    signUpUser,
    signOutUser,
    updateUserProfile,
    loading,
    setUser,
    user,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
