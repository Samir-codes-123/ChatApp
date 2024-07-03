import { useEffect } from "react";
import dbService from "../../appwriteConfig/appwriteDBconfig";
import { useSelector, useDispatch } from "react-redux";
import { addMsg, login, rmMsg } from "../../store/messageSlice";
import conf from "../../conf/conf";
import { Trash2 } from "react-feather";

const Messages = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await dbService.getPosts(); //promise
        dispatch(login(response.documents)); // array
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
      }
    };
    dbService.realTime(handleRealtimeUpdate);
    return () => {
      dbService.unsubscribe(); // to stop double render
    };
  }, [dispatch]); // show messages after dom renders

  const messages = useSelector((state) => state.msg.messages);
  // console.log("messages is", messages);

  const Delete = (msg) => {
    // sends realtime event
    dbService.deletePost(msg.$id); // works while reloading
    // dispatch(rmMsg(msg.$id)); dont need to do this done by realtime
  };

  return (
    <div>
      {messages.map((message) => (
        <div key={message.$id}>
          <div>
            <p>{new Date(message.$createdAt).toLocaleString()}</p>
            <Trash2 onClick={() => Delete(message)} />
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
