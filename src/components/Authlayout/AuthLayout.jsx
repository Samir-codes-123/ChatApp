import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwriteConfig/appwriteAuthConfig";
import { login as sliceLogin } from "../../store/messageSlice";
import { Loader } from "react-feather";

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
        console.log("User data:", userData);
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
  }, [authStatus, navigate, authentication, userFetched]); // Include userFetched in the dependency array

  return loader ? (
    <Loader className=" text-3xl w-full h-96 animate-spin" />
  ) : (
    <>{children}</>
  );
}
