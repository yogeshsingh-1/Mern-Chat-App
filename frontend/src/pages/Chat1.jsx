import { Button, TextField, Avatar } from "@mui/material";

const users = [
  { name: "yogesh", email: "yogesh@gmail.com" },
  { name: "mohini", email: "mohini@gmail.com" },
  { name: "ram", email: "ram@gmail.com" },
  { name: "hari", email: "hari@gmail.com" },
  { name: "yashi", email: "yashi@gmail.com" },
  { name: "karan", email: "karan@gmail.com" },
  { name: "pankaj", email: "pankaj@gmail.com" },
//   { name: "jyoti", email: "jyoti@gmail.com" },
];
const Chat1 = () => {
  return (
    <div className="max-w-[80vw] w-full mx-auto bg-white mt-10 flex h-[80vh] rounded-lg shadow-xl overflow-hidden">
      {/* left */}
      <div className="w-[27%] border-r flex flex-col bg-white">
        {/* left-top */}
        <div className="border-b p-3">
          <TextField label="Search user..." fullWidth size="small" />
        </div>
        {/* left-bottom */}
        <div className="flex-1 py-1 px-2 overflow-auto scroll-smooth ">
          {users.length ? (
            users.map((user, index) => (
              <div className=" rounded-md px-2 py-2  flex items-center gap-2.5 hover:bg-gray-200/50  mt-1 hover:shadow-md duration-100">
                <div className="">
                  <Avatar className="bg-blue-600!">{user.name[0]}</Avatar>
                </div>
                <div className="flex-1">
                  <h3 className="text-md font-semibold">{user.name}</h3>
                  <p className="text-xs font-light text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm font-medium text-gray-700 text-center">
              No User Found.
            </div>
          )}
        </div>
      </div>
      {/* right */}
      <div className="flex-1 overflow-hidden flex flex-col justify-between ">
        {/* right-top */}
        <div className="border-b py-3 px-3 flex items-center gap-3 ">
          <Avatar>Y</Avatar>
          <h3 className="text-md font-semibold">Chat Name</h3>
        </div>
        {/* right-center */}
        <div className="flex-1 px-4 py-2"> green</div>
        {/* right-bottom */}
        <div className="px-4 py-2 border-t  ">
          <div className="flex gap-4">
            <TextField
              fullWidth
              label="message"
              type="text"
              size="small"
              required
            />
            <Button variant="contained">Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat1;
