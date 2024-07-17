import Logout from "./Logout";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.msg.userInfo);
  return (
    <div className="bg-blue-600 text-white p-4  shadow-md ">
      {user ? (
        <div className="text-xl font-medium flex justify-between items-center">
          Welcome {user.name}
          <Logout />
        </div>
      ) : (
        <h1 className="font-semibold">SamChat </h1>
      )}
    </div>
  );
};

export default Header;
