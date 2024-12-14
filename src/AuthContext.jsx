import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { token } : null; // Jika ada token, set user dengan token
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token); // Simpan token ke localStorage
  };

  const checkLogin = () => {
    const token = localStorage.getItem("token");
    console.log(token)
    if (token) {
      setUser({ token });
    } else {
      setUser(null);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token"); // Hapus token dari localStorage
  };

  // Pastikan checkLogin hanya dijalankan sekali saat pertama kali komponen dimuat
  useEffect(() => {
    checkLogin(); // Panggil checkLogin hanya sekali saat komponen pertama kali dimuat
  }, []); // Pastikan useEffect hanya dijalankan sekali

  return (
    <AuthContext.Provider value={{ user, login, logout, checkLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
