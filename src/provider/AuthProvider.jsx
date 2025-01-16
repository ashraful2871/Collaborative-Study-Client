import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase/firebase.init";

export const AuthContext = createContext();

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Sign up user
  const signUpUser = async (email, password) => {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await handleToken(result.user.email);
      return result;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in user
  const signInUser = async (email, password) => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      await handleToken(result.user.email);
      return result;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const googleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      await handleToken(result.user.email);
      return result;
    } catch (error) {
      console.error("Error with Google login:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out user
  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Handle JWT token
  const handleToken = async (email) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
        email,
      });
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
    } catch (error) {
      console.error("Error generating token:", error);
    }
  };

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser?.email) {
        setUser(currentUser);
        const token = localStorage.getItem("token");
        if (!token) {
          await handleToken(currentUser.email);
        }
      } else {
        setUser(null);
        localStorage.removeItem("token");
      }
      setLoading(false);
    });

    return () => unSub();
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
