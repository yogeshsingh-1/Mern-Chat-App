import { createContext, useEffect, useState } from "react";
import Axios from "../utils/axiox.utils";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState("loading");
  const [id, setId] = useState(null);
  // debugger;
  const verifyUser = async () => {
    try {
      // debugger;
      const { data } = await Axios.get("/api/v1/verify/verify-token");
      if (data.success) {
        setAuthState("valid");
        setId(data.userId);
      } else {
        setAuthState("invalid");
      }
    } catch (e) {
      console.log("Error Response:", e?.response);
      setAuthState("invalid");
    }
  };
  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState, verifyUser, id }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
