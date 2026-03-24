import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import Axios from "../utils/axiox.utils";
const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const handler = (e) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("/auth/login", login);
      if (data.status) {
        console.log(data);
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-5">
      <TextField
        label="Email"
        fullWidth
        className=""
        type="email"
        name="email"
        placeholder="Email"
        size="small"
        value={login.email}
        onChange={handler}
        required
      />
      <TextField
        label="Password"
        fullWidth
        className=""
        type="password"
        name="password"
        placeholder="password"
        size="small"
        value={login.password}
        onChange={handler}
        required
      />
      <Button type="submit" variant="contained">
        Login
      </Button>
    </form>
  );
};

export default Login;
