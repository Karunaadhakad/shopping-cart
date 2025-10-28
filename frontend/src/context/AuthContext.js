import React, { createContext, useState, useEffect } from "react";
import api from "../utils/api";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const s = localStorage.getItem("user") || sessionStorage.getItem("user");
    return s ? JSON.parse(s) : null;
  });
  useEffect(() => { const t = localStorage.getItem("token") || sessionStorage.getItem("token"); if (t) api.defaults.headers.common["Authorization"] = `Bearer ${t}`; }, []);
  const login = (userObj, token, remember) => {
    setUser(userObj);
    if (remember) { localStorage.setItem("token", token); localStorage.setItem("user", JSON.stringify(userObj)); }
    else { sessionStorage.setItem("token", token); sessionStorage.setItem("user", JSON.stringify(userObj)); }
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token"); localStorage.removeItem("user"); sessionStorage.removeItem("token"); sessionStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
  };
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
