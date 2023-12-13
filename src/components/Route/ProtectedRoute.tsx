import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

import { IoStorefrontSharp } from "react-icons/io5";
import { FaUsersLine } from "react-icons/fa6";
import { useNavbarContext } from "../../context/NavbarContext";

const ProtectedRoute = () => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await currentUser();
      if (!user) navigate("/login");
      else setIsLoggedIn(true);
    })();
  }, [currentUser, navigate]);

  const { isOpen, setIsOpen } = useNavbarContext();
  return isLoggedIn ? (
    <>
      <Navbar />
      <Outlet />
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="bg-[#0000003f] w-full min-h-screen absolute left-0 top-0 transition-all duration-300"
        ></div>
      )}
      <div
        className={`w-56 min-h-screen border-r shadow-md  grid fixed bg-white transition-all duration-500 ${
          isOpen ? "left-0" : "left-[-20rem]"
        } top-0 `}
      >
        <div
          className={`h-fit mt-16 pt-3.5 transition-all duration-500 ${
            isOpen ? "left-[-1rem]" : "left-0"
          }`}
        >
          <button
            className="w-11/12 mx-auto text-center mt-2 p-4 flex items-center rounded-lg duration-300 
             hover:text-white transition-all
          justify-center gap-4 bg-yellow-500 text-orange-800 font-medium"
          >
            <IoStorefrontSharp className="text-2xl" /> Local
          </button>

          <button
            className="w-11/12 mx-auto text-center mt-2 p-4 flex items-center rounded-lg duration-300  hover:text-white transition-all
          justify-center gap-4 bg-yellow-500 text-orange-800 font-medium"
          >
            <FaUsersLine className="text-2xl" /> Empleados
          </button>
          <button
            className="w-11/12 mx-auto text-center mt-2 p-4 flex items-center rounded-lg duration-300  hover:text-white transition-all
          justify-center gap-4 bg-yellow-500 text-orange-800 font-medium"
          >
            <FaUsersLine className="text-2xl" /> Servicios
          </button>
          <button
            className="w-11/12 mx-auto text-center mt-2 p-4 flex items-center rounded-lg duration-300  hover:text-white transition-all
          justify-center gap-4 bg-yellow-500 text-orange-800 font-medium"
          >
            <FaUsersLine className="text-2xl" /> Citas
          </button>
        </div>
      </div>
    </>
  ) : (
    <>Loading...</>
  );
};

export default ProtectedRoute;
