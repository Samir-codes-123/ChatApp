import React from "react";
import Logout from "./Logout";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.msg.userInfo);
  return (
    <div>
      {user ? (
        <div>
          Welcome {user.name}
          <Logout />
        </div>
      ) : null}
    </div>
  );
};

export default Header;
