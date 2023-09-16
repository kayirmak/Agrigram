import { createContext, useState } from "react";
import { useSelector } from "react-redux";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const user = useSelector(state => state.auth.currentUser);
 
  const value = {user}

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}

