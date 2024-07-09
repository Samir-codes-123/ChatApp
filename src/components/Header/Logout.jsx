import { LogOut } from "react-feather";
import authService from "../../appwriteConfig/appwriteAuthConfig";
import { useDispatch } from "react-redux";
import { logout as sliceLogout } from "../../store/messageSlice";
const Logout = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    authService.logout().then(dispatch(sliceLogout()));
  };
  return (
    <LogOut
      onClick={handleClick}
      className="inline mx-2  text-white hover:text-red-700 cursor-pointer"
    />
  );
};

export default Logout;
