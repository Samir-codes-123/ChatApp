import React from "react";
import { LogOut } from "react-feather";
import authService from "../../appwriteConfig/appwriteAuthConfig";
import { useDispatch } from "react-redux";
import { logout as sliceLogout } from "../../store/messageSlice";
const Logout = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    authService.logout().then(dispatch(sliceLogout()));
  };
  return <LogOut onClick={handleClick} />;
};

export default Logout;
