import { useState } from "react";
import dbService from "../../appwriteConfig/appwriteDBconfig";
import { Send } from "react-feather";
import Button from "../Button";
import { useSelector } from "react-redux";

const InputMessages = () => {
  const [input, setInput] = useState("");
  const user = useSelector((state) => state.msg.userInfo);
  const handeSubmit = async (e) => {
    e.preventDefault();
    const response = await dbService.createPost(user, input); // sends realtime event
    console.log(response);
    // dispatch(addMsg(response)); dont need to do this done by realtime
    setInput("");
  };

  return (
    <form
      onSubmit={handeSubmit}
      className="w-full h-1/3 flex space-x-3 p-4 rounded "
    >
      <textarea
        required
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder="Enter messages..."
        className="h-24 w-2/3 outline-none border-4 border-blue-400 active:ring-2 active:ring-blue-200 rounded-xl p-2 shadow-lg"
      />
      <Button className="my-6">
        <Send />
      </Button>
    </form>
  );
};

export default InputMessages;
