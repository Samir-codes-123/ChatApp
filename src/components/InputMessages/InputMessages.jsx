import { useState } from "react";
import dbService from "../../appwriteConfig/appwriteDBconfig";
import Input from "../Input";
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
    <form onSubmit={handeSubmit}>
      <Input
        required
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <Button>Send</Button>
    </form>
  );
};

export default InputMessages;
