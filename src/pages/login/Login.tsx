/* eslint-disable @typescript-eslint/ban-types */

import InputCustom from "../../components/Form/Inputs/InputCustom";
import { useForm } from "react-hook-form";
import { FirebaseError } from "firebase/app";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { message } from "antd";
import { useState } from "react";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="w-full mx-auto grid  justify-items-center">
        <form
          onSubmit={handleSubmit(
            async (data) => {
              try {
                setLoading(true);
                await login(data.email, data.password);
                setLoading(false);
                message.success("Logged in successfully");
                setTimeout(() => {
                  navigate("/");
                }, 1000);
              } catch (err) {
                if (err instanceof FirebaseError) {
                  const fe = err as FirebaseError;
                  message.error(fe.message);
                }
              }
            },
            (err) => {
              Object.keys(err).forEach((x) => message.error(err[x]?.message as string));
            }
          )}
        >
          <div className=" grid gap-6 pb-10  ">
            <InputCustom
              label="Email"
              name="email"
              placeholder="Email"
              rules={{ required: { value: true, message: "Email is required" } }}
              register={register}
            />

            <InputCustom
              label="Password"
              name="password"
              placeholder="Password"
              rules={{
                required: { value: true, message: "Password is required" },
                minLength: { message: "Password needs to be at least 6 digits", value: 6 },
              }}
              type="password"
              register={register}
            />
          </div>
          <button
            disabled={loading}
            className="bg-yellow-400 hover:bg-yellow-500 active:scale-95 transition-all disabled:bg-gray-300
             disabled:text-gray-400 disabled:cursor-not-allowed
          text-orange-800 p-3 rounded-lg font-medium mt-4 max-w-sm w-10/12 mx-auto flex justify-center"
          >
            Login
          </button>
          <Link to={"/sign-up"} className="text-gray-500 text-sm mx-auto w-fit flex mt-4">
            Don't you have an account?{" "}
            <span className="ml-2 text-orange-800 font-medium">Sign up here!</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
