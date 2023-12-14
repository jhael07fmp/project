import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CreateButton = ({ url }: { url: string }) => {
  return (
    <div className="w-fit gap-4 flex items-center px-2">
      <Link
        to={url}
        className="bg-white text-orange-800 p-2 
      rounded-md hover:bg-green-50 hover:text-green-500 transition-all"
      >
        <FaPlus />
      </Link>
    </div>
  );
};

export default CreateButton;
