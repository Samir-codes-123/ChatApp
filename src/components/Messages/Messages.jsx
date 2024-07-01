import { useEffect, useState } from "react";
import dbService from "../../appwriteConfig/appwriteDBconfig";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/messageSlice";

const Messages = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await dbService.getPosts(); //promise
        const ans = dispatch(login(response.documents)); // array
        //  console.log(response.documents);
        console.log(ans);
      } catch (error) {
        console.log("error fetching");
      }
    };
    fetchdata();
  }, [dispatch]); // show messages after dom renders
  const messages = useSelector((state) => state.msg.messages);
  console.log("messages is", messages);

  return (
    <div>
      {messages.map((message) => (
        <div key={message.$id}>
          <div>
            <p>{message.$createdAt}</p>
          </div>
          <div>
            <span>{message.body}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
