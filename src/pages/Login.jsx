import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwriteConfig/appwriteAuthConfig";
import { login as sliceLogin } from "../store/messageSlice";
import { ExternalLink } from "react-feather";
import { useState } from "react";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, SetError] = useState(null);
  // const login = async (data) => {
  //   try {
  //     const session = await authService.login(data);
  //     if (session) {
  //       const userData = await authService.getCurrentUser();
  //       if (userData) {
  //         dispatch(sliceLogin(userData));
  //         navigate("/");
  //       }
  //     }
  //   } catch (error) {
  //     console.log("hahahaha");
  //     console.log(error);
  //   }
  // };
  const login = async (data) => {
    SetError(null);
    console.log("Attempting to login with data:", data);
    try {
      const session = await authService.login(data);
      // console.log("Session:", session);
      if (session) {
        const userData = await authService.getCurrentUser();
        console.log("User data:", userData);
        if (userData) {
          dispatch(sliceLogin(userData));
        }
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      SetError(error.message);
    }
  };

  return (
    <div className="w-full h-full  flex flex-col justify-center items-center bg-slate-200 space-y-6">
      <h1 className="text-center text-4xl font-semibold text-blue-600">
        Welcome to SamChat
      </h1>
      {error && (
        <div className="text-xl font-semibold text-red-600">
          {error}
          <p></p>
        </div>
      )}
      <div>
        <form
          onSubmit={handleSubmit(login)}
          className="w-96 h-96 space-y-6 p-4 border-2 rounded-md border-blue-500 bg-white flex flex-wrap flex-col shadow-lg"
        >
          <Input
            className=" invalid:border-red-500 invalid:ring-red-300"
            label="Email: "
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Password: "
            className=" invalid:border-red-500 invalid:ring-red-300"
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: true,
            })}
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
          <p className="text-m font-semibold">
            Dont have a Account? Register here{" "}
            <Link to="/signup">
              <ExternalLink className="inline size-5 text-blue-700 hover:text-red-700" />
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
