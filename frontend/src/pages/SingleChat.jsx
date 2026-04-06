import { TextField } from "@mui/material";
import React, { useState } from "react";

const SingleChat = ({ selectedUser, chatData }) => {
  const [text, setText] = useState("");
  const changeHandler = (e) => {
    console.log(e);
    if (e.key == "Enter") {
      // alert("Enter Pressed");
      console.log("alert");
    }
  };
  return (
    <>
      <div className=" bg-zinc-300 text-right">
        {selectedUser?.name} | {selectedUser?.id}
      </div>
      <div className="mt-10">
        <form action="">
          <TextField
            label="Type a message..."
            variant="outlined"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={changeHandler}
          />
        </form>
      </div>
    </>
  );
};

export default SingleChat;
