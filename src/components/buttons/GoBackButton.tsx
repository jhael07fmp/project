import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="p-2 hover:text-white bg-white hover:bg-orange-400 mr-2 rounded-md"
      onClick={() => {
        navigate(-1);
      }}
    >
      <FaAngleLeft className="text-orange-900 " />
    </button>
  );
};

export default GoBackButton;
