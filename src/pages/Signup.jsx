import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate, Link } from "react-router-dom";
import authService from "../appwriteConfig/appwriteAuthConfig";
import { login } from "../store/messageSlice";
import { useState } from "react";
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
    <div>
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
      <div>
        <form onSubmit={handleSubmit(signup)}>
          <Input
            label="Name: "
            placeholder="Enter your Name"
            {...register("name", {
              required: true,
            })}
          />
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
          <Button type="submit">Signup</Button>
        </form>
        <p>
          Already have a Account? Register <Link to="/login">here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
