import { useState } from "react";
import dbService from "../../appwriteConfig/appwriteDBconfig";
import { Send, Image } from "react-feather";
import Button from "../Button";

import { useSelector } from "react-redux";

const InputMessages = () => {
  const [input, setInput] = useState("");

  const user = useSelector((state) => state.msg.userInfo);

  // for file upload
  const handleupload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    try {
      const response = await dbService.uploadFile(uploadedFile);
      const fileID = response.$id;
      await dbService.createPost(user.$id, user.name, input, fileID);
      console.log(response);
      setInput("");
    } catch (error) {
      console.error("Error uploading file: ", error);
      alert("Please select only images");
    }
  };

  //for messages
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dbService.createPost(
      user.$id,
      user.name,
      input,
      null,
    ); // sends realtime event
    console.log(response);
    // dispatch(addMsg(response)); dont need to do this done by realtime
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-1/3 flex space-x-3 p-4 rounded "
    >
      <input
        required
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder="Enter messages..."
        className="h-24 w-2/3 outline-none border-4 border-blue-400 active:ring-2 active:ring-blue-200 rounded-xl p-2 shadow-lg"
      />
      <Button className="my-6">
        <Send />
      </Button>

      <label className=" w-16 h-11 ml-2 mt-6 bg-blue-500 border-2 border-blue-800 hover:bg-blue-400 active:bg-blue-700 shadow-md rounded-md flex justify-center items-center">
        <Image className="w-14 size-8 cursor-pointer text-white" />
        <input
          type="file"
          onChange={(e) => handleupload(e)}
          className="hidden "
        />
      </label>
    </form>
  );
};

export default InputMessages;
