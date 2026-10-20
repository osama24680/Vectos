// AuthContext.js
import React, { createContext, useState } from "react";
import { publicProfile } from "./helpers/password";

export const AuthContext = createContext();

// read the session synchronously so a refresh on a protected page
// doesn't bounce the user to "/" before the session is restored
const readStoredUser = () => {
  try {
    const stored = JSON.parse(localStorage.getItem("loggedInUser"));
    return stored ? publicProfile(stored) : null;
  } catch {
    return null;
  }
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);
  const isAuthenticated = Boolean(user);

  const login = (account) => {
    const profile = publicProfile(account);
    setUser(profile);
    localStorage.setItem("loggedInUser", JSON.stringify(profile));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
