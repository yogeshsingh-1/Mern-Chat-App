import React from "react";
import { Button, TextField } from "@mui/material";
const Login = () => {
  return (
    <form onSubmit={""} className="flex flex-col gap-5">
      <TextField
        label="Email"
        fullWidth
        className=""
        type="email"
        name="email"
        placeholder="Email"
        size="small"
      />
      <TextField
        label="Password"
        fullWidth
        className=""
        type="password"
        name="password"
        placeholder="password"
        size="small"
      />
      <Button variant="contained">Login</Button>
    </form>
  );
};

export default Login;
