/* eslint-disable @typescript-eslint/ban-types */
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { postUser } from "../../api/users";
import { User } from "../../interfaces/Interfaces";
import InputCustom from "../../components/Form/Inputs/InputCustom";
import { useForm } from "react-hook-form";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const createUser = async ({ email, password }: { email: string; password: string }) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    return user.uid;
  };

  const signUp = async (userData: User) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const u = userData as any;
    delete u.password;
    await postUser(userData.id, { ...(u as User) });
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="w-full mx-auto grid  justify-items-center">
        <form
          onSubmit={handleSubmit(
            async (data) => {
              try {
                const userId = await createUser({ email: data.email, password: data.password });
                await signUp({
                  ...data,
                  id: userId!,
                  email: data.email,
                  roles: [{ id: "customer", name: "CUSTOMER" }],
                });
                navigate("/");
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
          <div className=" grid gap-6 lg:grid-cols-2  pb-10  ">
            <InputCustom
              label="Name"
              name="name"
              placeholder="Name"
              rules={{ required: { value: true, message: "name is required" } }}
              register={register}
            />

            <InputCustom
              label="Address"
              name="address"
              placeholder="Address"
              rules={{}}
              type="text"
              register={register}
            />

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
          <button className="bg-yellow-400 text-orange-800 p-3 rounded-lg font-medium mt-4  w-10/12 mx-auto">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
