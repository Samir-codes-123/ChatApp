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
      console.log(res);
      // if (!res) console.log("lado");
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
  // console.log("messages is", messages);

  const user = useSelector((state) => state.msg.userInfo);
  // console.log("userInfo is ", user);

  const Delete = async (msg) => {
    // sends realtime event

    await dbService.deletePost(msg.$id);
    if (msg.type === "media") {
      await dbService.deleteFile(msg.image); // file id saved in image
    } // works while reloading
    // dispatch(rmMsg(msg.$id)); dont need to do this done by realtime
  };

  const edit = (msg) => {
    setEditingMsgId(msg.$id);
    setNewMsg(msg.body);
  };

  const update = async (msg) => {
    if (messages.image) return;
    await dbService.updatePost(msg.$id, newMsg);
    setEditingMsgId(null);
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-slate-200 p-4">
      <div className="h-full w-full max-w-4xl overflow-y-auto space-y-3">
        {messages?.map((message) => (
          <div
            key={message.$id}
            className={`max-w-md w-full p-4 border-2 rounded-lg shadow-md hover:bg-gradient-to-r from-blue-300 to-slate-400 cursor-move ${
              message.user_id === user?.$id
                ? "border-blue-600 bg-white"
                : "bg-blue-600 border-white"
            }`}
          >
            <div className="flex justify-between items-center">
              <p className="flex items-center gap-2">
                <span
                  className={
                    message.user_id === user?.$id
                      ? "text-blue-600 font-medium"
                      : "text-white font-medium"
                  }
                >
                  {message.user_id === user?.$id ? "Me" : message.username}
                </span>
                <span
                  className={
                    message.user_id === user?.$id
                      ? "text-blue-600 text-xs"
                      : "text-white text-xs"
                  }
                >
                  {new Date(message.$createdAt).toLocaleString()}
                </span>
              </p>
              {user?.$id === message.user_id && (
                <div className="flex gap-2">
                  <Trash2
                    onClick={() => Delete(message)}
                    className="text-sm text-blue-800 hover:text-red-600 cursor-pointer"
                  />
                  {editingMsgId === message.$id ? (
                    <Check
                      onClick={() => update(message)}
                      className="text-green-500 cursor-pointer"
                    />
                  ) : (
                    <Edit
                      onClick={() => edit(message)}
                      className="text-sm text-blue-800 hover:text-green-500 cursor-pointer"
                    />
                  )}
                </div>
              )}
            </div>
            <div className="mt-2">
              {editingMsgId === message.$id ? (
                <Input
                  label="Update new message"
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                />
              ) : (
                <span
                  className={`block text-xl font-semibold  ${message.user_id === user?.$id ? "text-blue-700" : "text-white"}`}
                >
                  {/*checks and displays */}
                  {message.body && <p> {message.body}</p>}
                  {message.image && (
                    <img
                      src={dbService.getFilePreview(message.image)}
                      alt={message.username}
                      className={`rounded-md hover:animate-pulse w-full h-auto object-cover  border-2 ${message.user_id === user?.$id ? "border-blue-600" : "border-white"}`}
                    />
                  )}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
