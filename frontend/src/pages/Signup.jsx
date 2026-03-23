import React from "react";
import { Button, TextField } from "@mui/material";
import Axios from "../utils/axiox.utils";
const Signup = () => {
  return (
    <form onSubmit={""} className="flex flex-col gap-5">
      <TextField
        label="Name"
        fullWidth
        className=""
        type="text"
        name="name"
        placeholder="Name"
        size="small"
      />
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
      <Button variant="contained">SignUp</Button>
    </form>
  );
};

export default Signup;
