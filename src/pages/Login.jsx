import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwriteConfig/appwriteAuthConfig";
import { login as sliceLogin } from "../store/messageSlice";
import { ExternalLink } from "react-feather";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    console.log("Attempting to login with data:", data);
    try {
      const session = await authService.login(data);
      console.log("Session:", session);
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
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(login)}>
          <Input
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
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: true,
            })}
          />
          <Button type="submit">Login</Button>
        </form>
        <p>
          Dont have a Account? Register here{" "}
          <Link to="/signup">
            <ExternalLink />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
