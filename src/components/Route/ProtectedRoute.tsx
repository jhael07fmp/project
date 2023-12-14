/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

import { IoStorefrontSharp } from "react-icons/io5";
import { FaUsersLine } from "react-icons/fa6";
import { useNavbarContext } from "../../context/NavbarContext";
import { getUser } from "../../api/users";
import { Link } from "react-router-dom";

const ProtectedRoute = () => {
  const { currentUser, setUserData, userData } = useAuthContext();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await currentUser();
      if (user) {
        const findUser = await getUser(user?.uid);
        setUserData(findUser as any);
      }

      if (!user) navigate("/login");
      else setIsLoggedIn(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isOpen, setIsOpen } = useNavbarContext();

  return isLoggedIn ? (
    <>
      <Navbar />
      <Outlet />
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="bg-[#0000003f] w-full min-h-screen fixed left-0 top-0 transition-all duration-300"
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
          {userData?.roles?.includes("admin") && (
            <>
              <Link to="/barbershops" className="sidebar-options">
                <IoStorefrontSharp className="text-2xl" /> Locales
              </Link>

              <button className="sidebar-options">
                <FaUsersLine className="text-2xl" /> Empleados
              </button>
              <button className="sidebar-options">
                <FaUsersLine className="text-2xl" /> Servicios
              </button>
              <Link to={"/appointment"} className="sidebar-options">
                <FaUsersLine className="text-2xl" /> Citas
              </Link>
            </>
          )}
          {userData?.roles?.includes("customer") && (
            <>
              <Link to={"/appointment"} className="sidebar-options">
                <FaUsersLine className="text-2xl" /> Citas
              </Link>
            </>
          )}
          {userData?.roles?.includes("employee") && (
            <>
              <Link to={"/appointment"} className="sidebar-options">
                <FaUsersLine className="text-2xl" /> Citas
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  ) : (
    <>Loading...</>
  );
};

export default ProtectedRoute;
