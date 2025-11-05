import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import "../Firebase"; // make sure this imports your initialized Firebase app

// Create context
const AuthContext = React.createContext();

// Custom hook
export function useAuth() {
  return useContext(AuthContext);
}

// Auth Provider
export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Monitor Firebase auth state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe; // cleanup on unmount
  }, []);

  // ✅ Signup function
  async function Signup(email, password, username) {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update display name
    await updateProfile(userCredential.user, {
      displayName: username,
    });

    setCurrentUser({ ...userCredential.user });
  }

  // ✅ Login function
  function Login(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  // ✅ Logout function
  async function Logout() {
    const auth = getAuth();
    return signOut(auth);
  }

  // ✅ Shared value
  const value = {
    currentUser,
    Signup,
    Login,
    Logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <h2>Loading...</h2> : children}
    </AuthContext.Provider>
  );
}
