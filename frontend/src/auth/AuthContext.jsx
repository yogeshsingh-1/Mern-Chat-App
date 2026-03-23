import { Children, createContext, useEffect, useState } from "react";
import Axios from "../utils/axiox.utils";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState("loading");
  const verifyAuth = async () => {
    try {
      const { data } = await Axios.get("/api/v1/verify-token");
      setAuthState(data.status ? "valid" : "invalid");
      if (data.staus) {
        localStorage.setItem("id", data.userId);
      }
    } catch (E) {
      setAuthState("invalid");
    }
  };
  useEffect(() => {
    verifyAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
