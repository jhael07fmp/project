import { Link } from "react-router-dom";

const CardDetail = ({
  services,
  image,
  name,
  buttonUrl,
  buttonTitle,
}: {
  image?: string;
  name?: string;
  services?: string[];
  buttonUrl?: string;
  buttonTitle?: string;
}) => {
  return (
    <div className="min-w-[18rem] w-10/12 border p-2 rounded-lg relative group bg-white hover:cursor-pointer hover:shadow-lg">
      <div className="rounded-md overflow-hidden">
        <img
          src={
            image ??
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHjLSBwIMa-ASwokA4L9bnZ7BU80W9B9WZF46O00RPH3IJFFJtIhyUNrOdC6FXdYKUx-E&usqp=CAU"
          }
          className="w-full object-cover"
        />
      </div>
      <div className="grid gap-4">
        <h2 className="font-medium w-11/12 justify-center flex m-auto border-b p-2">
          {name?.toUpperCase()}
        </h2>

        <Link to={buttonUrl ?? ""} className="button-normal">
          {buttonTitle}
        </Link>
      </div>

      {services && services?.length > 1 && (
        <div
          className={`hidden md:block absolute ${
            services && services?.length >= 3 && "group-hover:-bottom-44"
          } 
      ${services && services?.length === 2 && "group-hover:-bottom-32"} 
      ${services && services?.length === 1 && "group-hover:-bottom-24"} 

      left-0 mx-auto   
      rounded-lg group-hover:shadow-xl 
       z-[-2] group-hover:z-20 transition-all duration-200 min-h-40 bg-white p-1 border w-full justify-center bottom-0`}
        >
          <h3 className="text-orange-600 text-base font-bold  mx-auto w-fit flex mb-2">
            Servicios
          </h3>
          <div className="h-fit grid gap-2 w-11/12 mx-auto">
            {services
              ? services
                  ?.slice(0, 3)
                  .map((s) => (
                    <div className="bg-blue-500 p-2 rounded w-full h-fit text-center text-white">
                      {s}
                    </div>
                  ))
              : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDetail;
