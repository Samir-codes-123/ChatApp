import { useEffect, useState } from "react";
import dbService from "../../appwriteConfig/appwriteDBconfig";
import { useSelector, useDispatch } from "react-redux";
import { addMsg, intialMsg, rmMsg, updateMsg } from "../../store/messageSlice";
import conf from "../../conf/conf";
import { Trash2, Edit, Check } from "react-feather";
import Input from "../Input";

const Messages = () => {
  const dispatch = useDispatch();
  const [newMsg, setNewMsg] = useState("");
  const [editingMsgId, setEditingMsgId] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await dbService.getPosts(); //promise
        dispatch(intialMsg(response.documents)); // array
        //  console.log(response.documents);
        // console.log(ans);
      } catch (error) {
        console.log("error fetching");
      }
    };
    fetchdata();

    const handleRealtimeUpdate = (res) => {
      console.log("Real-time update received", res);
      // Handle different types of events
      if (
        res.events.includes(
          `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteCollectionId}.documents.*.create`,
        )
      ) {
        console.log("created");
        dispatch(addMsg(res.payload));
      } else if (
        res.events.includes(
          `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteCollectionId}.documents.*.delete`,
        )
      ) {
        console.log("deleted");
        dispatch(rmMsg(res.payload.$id));
      } else if (
        res.events.includes(
          `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteCollectionId}.documents.*.update`,
        )
      ) {
        console.log("update");
        dispatch(updateMsg(res.payload));
      }
    };
    dbService.realTime(handleRealtimeUpdate);
    return () => {
      dbService.unsubscribe(); // to stop double render
    };
  }, [dispatch]); // show messages after dom renders

  const messages = useSelector((state) => state.msg.messages);
  console.log("messages is", messages);

  const user = useSelector((state) => state.msg.userInfo);
  console.log("userInfo is ", user);

  const Delete = async (msg) => {
    // sends realtime event
    await dbService.deletePost(msg.$id); // works while reloading
    // dispatch(rmMsg(msg.$id)); dont need to do this done by realtime
  };

  const edit = (msg) => {
    setEditingMsgId(msg.$id);
    setNewMsg(msg.body);
  };
  const update = async (msg) => {
    await dbService.updatePost(msg.$id, newMsg);
    setEditingMsgId(null);
  };

  return (
    <div>
      {messages.map((message) => (
        <div key={message.$id}>
          <div>
            <p>
              {message.username ? (
                <span>{message.username}</span>
              ) : (
                <span>Anonymous user </span>
              )}
              {new Date(message.$createdAt).toLocaleString()}
            </p>
            {user?.$id === message.user_id ? (
              <div>
                <span>
                  <Trash2 onClick={() => Delete(message)} />
                </span>
                <span>
                  {editingMsgId === message.$id ? (
                    <Check onClick={() => update(message)} />
                  ) : (
                    <Edit onClick={() => edit(message)} />
                  )}
                </span>
              </div>
            ) : null}
          </div>
          <div>
            {editingMsgId === message.$id ? (
              <Input
                label="Update new message"
                value={newMsg}
                onChange={(e) => {
                  setNewMsg(e.target.value);
                }}
              />
            ) : (
              <span>{message.body}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
