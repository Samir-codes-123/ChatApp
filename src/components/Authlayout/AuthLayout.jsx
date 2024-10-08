import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwriteConfig/appwriteAuthConfig";
import { login as sliceLogin } from "../../store/messageSlice";
import { Loader } from "react-feather";
import dbService from "../../appwriteConfig/appwriteDBconfig";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [userFetched, setUserFetched] = useState(false); // New state
  const authStatus = useSelector((state) => state.msg.status);
  const dispatch = useDispatch();

  useEffect(() => {
    const onload = async () => {
      try {
        const userData = await authService.getCurrentUser();
        // console.log("User data:", userData);
        if (userData) {
          dispatch(sliceLogin(userData));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setUserFetched(true); // Set userFetched to true after fetching user data
      }
    };
    onload();
  }, [dispatch]);

  useEffect(() => {
    if (userFetched) {
      // Check if user data has been fetched
      if (authentication && authStatus !== authentication) {
        navigate("/login");
      } else if (!authentication && authStatus !== authentication) {
        navigate("/");
      }
      setLoader(false);
    }
  }, [authStatus, navigate, authentication, userFetched]);

  return loader ? (
    <Loader className=" m-auto  w-32 h-32  items-center  animate-spin" />
  ) : (
    <>{children}</>
  );
}
