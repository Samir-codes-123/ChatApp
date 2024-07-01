import { useState } from "react";
import dbService from "../../appwriteConfig/appwriteDBconfig";
import Input from "../Input";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { addMsg } from "../../store/messageSlice";

const InputMessages = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const handeSubmit = async (e) => {
    e.preventDefault();
    const response = await dbService.createPost(input);
    console.log(response);
    dispatch(addMsg(response));
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
