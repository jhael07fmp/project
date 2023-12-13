import { MdLogout, MdOutlineClose } from "react-icons/md";
import { useAuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import SearchBar from "../search/SearchBar";
import { useNavbarContext } from "../../context/NavbarContext";
import { MdMenu } from "react-icons/md";

const Navbar = () => {
  const { logout } = useAuthContext();
  const { isOpen, setIsOpen } = useNavbarContext();
  const navigate = useNavigate();

  const logoutFn = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-full p-4 shadow-md flex justify-between items-center z-10 fixed top-0 bg-white">
      <div className="w-full flex items-center md:gap-20 gap-8 ">
        <div className="flex items-center gap-4 h-fit">
          <button className="w-fit " onClick={() => setIsOpen((prev) => !prev)}>
            {!isOpen ? (
              <MdMenu className="text-2xl text-gray-500" />
            ) : (
              <MdOutlineClose className="text-2xl text-gray-500" />
            )}
          </button>
          <h2
            className="font-medium flex gap-1 font-sans text-sm sm:text-lg md:text-xl
           bg-yellow-500 text-white p-2 rounded-lg w-fit"
          >
            TuPeluqueria <span className="hidden sm:flex">App</span>
          </h2>
        </div>
        <div className="w-7/12 lg:w-5/12">
          <SearchBar />
        </div>
      </div>
      <button
        className="rounded-md p-2 hover:bg-yellow-200 hover:cursor-pointer"
        onClick={logoutFn}
      >
        <MdLogout className="text-lg text-orange-800" />
      </button>
    </div>
  );
};

export default Navbar;
