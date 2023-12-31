import { IoIosSearch } from "react-icons/io";
import { useNavbarContext } from "../../context/NavbarContext";

const SearchBar = () => {
  const { setSearchTerm } = useNavbarContext();

  return (
    <div className="w-full p-2 rounded-md border border-gray-300 flex gap-2 items-center">
      <input
        type="text"
        id="search"
        placeholder="Search barbershop or Barber..."
        className="w-full outline-none pl-2 p-0.5"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <IoIosSearch className="text-3xl text-yellow-500 bg-yellow-100 p-1 rounded-md" />
    </div>
  );
};

export default SearchBar;
