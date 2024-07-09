import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate, Link } from "react-router-dom";
import authService from "../appwriteConfig/appwriteAuthConfig";
import { login } from "../store/messageSlice";
import { useState } from "react";
import { ExternalLink } from "react-feather";
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const signup = async (data) => {
    setError(null);
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-200 space-y-6">
      {error && (
        <div>
          <p className="text-red-600">{error}</p>
        </div>
      )}
      <div>
        <form
          onSubmit={handleSubmit(signup)}
          className="w-96 h-96 space-y-2 p-4 border-2 rounded-md border-blue-500 bg-white flex flex-wrap flex-col shadow-lg"
        >
          <Input
            label="Name: "
            placeholder="Enter your Name"
            {...register("name", {
              required: true,
            })}
          />
          <Input
            label="Email: "
            className=" invalid:border-red-500 invalid:ring-red-300 "
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
            Signup
          </Button>
          <p className="text-m font-semibold">
            Already have a Account? Register here{" "}
            <Link to="/login">
              <ExternalLink className="inline size-5 text-blue-700 hover:text-red-700" />
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
