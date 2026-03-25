import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import Axios from "../utils/axiox.utils";
import { Box } from "@mui/material";
const Logout = () => {
  const { setAuthState } = useContext(AuthContext);

  const handleLogout = async () => {
    const { data } = await Axios.get("/auth/logout");
    console.log(data);
    localStorage.clear();
    setAuthState("invalid");
  };
  return (
    // <Button variant="text" className="" onClick={handleLogout}>

    // </Button>
    <Box onClick={handleLogout}>Logout</Box>
  );
};

export default Logout;
