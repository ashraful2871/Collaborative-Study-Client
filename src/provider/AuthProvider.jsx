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
      setUser(currentUser);
      setLoading(false);
      console.log(currentUser);
      //   if (currentUser?.email) {
      //     setUser(currentUser);

      //     //generate token
      //     const { data } = await axios.post(
      //       `${import.meta.env.VITE_API_URL}/jwt`,
      //       {
      //         email: currentUser?.email,
      //       },
      //       { withCredentials: true }
      //     );
      //   } else {
      //     setUser(currentUser);
      //     //clear token
      //     const response = await axios.post(
      //       `${import.meta.env.VITE_API_URL}/logout`,
      //       {},
      //       {
      //         withCredentials: true,
      //       }
      //     );
      //     console.log(response);
      //   }
      //   if (currentUser) {
      //     const userInfo = { email: currentUser.email };
      //     axiosPublic
      //       .post("/jwt", userInfo)
      //       .then((res) => {
      //         if (res.data.token) {
      //           localStorage.setItem("access-token", res.data.token);
      //           setLoading(false);
      //         }
      //       })
      //       .catch((error) => {
      //         console.error("Failed to fetch JWT:", error);
      //       });
      //   } else {
      //     localStorage.removeItem("access-token");
      //     setLoading(false);
      //   }
      //   setLoading(false);
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
