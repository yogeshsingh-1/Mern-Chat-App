import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import Axios from "../utils/axiox.utils";
const Signup = () => {
  const [signup, setSignup] = useState({ name: "", email: "", password: "" });
  const handler = (e) => {
    setSignup((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("/auth/signup", signup);
      if (data.status) {
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
        label="Name"
        fullWidth
        type="text"
        name="name"
        placeholder="Name"
        size="small"
        value={signup.name}
        onChange={handler}
        required
      />
      <TextField
        label="Email"
        fullWidth
        className=""
        type="email"
        name="email"
        placeholder="Email"
        size="small"
        value={signup.email}
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
        value={signup.password}
        onChange={handler}
        required
      />
      <Button type="submit" variant="contained">
        SignUp
      </Button>
    </form>
  );
};

export default Signup;
