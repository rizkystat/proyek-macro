import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true); // Jika user ada, set isAuthenticated true
    } else {
      setIsAuthenticated(false); // Jika tidak ada user, set isAuthenticated false
      navigate("/login"); // Arahkan ke halaman login
    }
  }, [user, navigate]); // Dependensi user dan navigate, hanya akan dijalankan saat user berubah

  return isAuthenticated ? children : null; // Render children jika user sudah terautentikasi
};

export default PrivateRoute;
