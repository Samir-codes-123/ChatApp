import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = true; ///useSelector((state)=> state.msg.status)

  useEffect(() => {
    /* If authentication is true and authStatus is not true, it means the route requires authentication, 
    but the user is not authenticated. So, the user is redirected to the /login page.
If authentication is false (i.e., the route should be accessible without authentication) and authStatus is not false,
 it means the user is authenticated and should not access this route. So, the user is redirected to the home page (/). */
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
