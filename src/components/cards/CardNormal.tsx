import { Link } from "react-router-dom";

const CardNormal = ({
  image,
  cardTitle,
  buttonUrl,
  buttonTitle,
}: {
  image?: string;
  cardTitle: string;
  buttonUrl?: string;
  buttonTitle: string;
}) => {
  return (
    <div className="w-10/12 border p-2 rounded-lg relative group bg-white hover:cursor-pointer hover:shadow-lg">
      <div className="rounded-md overflow-hidden ">
        {image ? (
          <img src={image} className="w-full object-cover h-72" />
        ) : (
          <div className="h-52 bg-gray-100 flex justify-center items-center text-lg font-medium text-gray-400">
            No Image
          </div>
        )}
      </div>
      <div className="grid gap-4">
        <h2 className="font-medium w-11/12 justify-center flex m-auto border-b p-2">
          {cardTitle.toUpperCase()}
        </h2>

        <Link to={buttonUrl || ""} className="button-normal">
          {buttonTitle}
        </Link>
      </div>
    </div>
  );
};

export default CardNormal;
