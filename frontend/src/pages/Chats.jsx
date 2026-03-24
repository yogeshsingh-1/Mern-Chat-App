import React, { useEffect, useState } from "react";
import Axios from "../utils/axiox.utils";
import { all } from "axios";
const Chats = () => {
  const [view, setView] = useState(true);
  const [user, setUser] = useState();
  const allUsers = async () => {
    try {
      const { data } = await Axios.get("/api/v1/user/all");
      if (data.status) {
        setView(false);
        setUser(data?.data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };
  useEffect(() => {
    allUsers();
  }, []);
  if (view) {
    return <p>Loading...</p>;
  }
  return <div>{JSON.stringify(user)}</div>;
};

export default Chats;
