/* eslint-disable @typescript-eslint/ban-types */

import InputCustom from "../../components/Form/Inputs/InputCustom";
import { useForm } from "react-hook-form";
import { FirebaseError } from "firebase/app";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

const SignUp = () => {
  const { register, handleSubmit } = useForm();

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="w-full mx-auto grid  justify-items-center">
        <form
          onSubmit={handleSubmit(
            async (data) => {
              try {
                const message = await signInWithEmailAndPassword(auth, data.email, data.password);
                console.log(message);
                alert("succcess");
              } catch (err) {
                if (err instanceof FirebaseError) {
                  const fe = err as FirebaseError;
                  alert(fe.code);
                  console.error(fe);
                }
              }
            },
            (err) => {
              Object.keys(err).forEach((x) => alert(err[x]?.message));
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
          <button className="bg-yellow-400 hover:bg-yellow-500 active:scale-95 transition-all text-orange-800 p-3 rounded-lg font-medium mt-4 max-w-sm w-10/12 mx-auto flex justify-center">
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
