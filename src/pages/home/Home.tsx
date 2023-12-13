import { useEffect, useState } from "react";
import { Barbershop } from "../../interfaces/Interfaces";
import { getBarbershops } from "../../api/barbershops";
import { Link } from "react-router-dom";

export const Home = () => {
  useEffect(() => {
    (async () => {})();
  }, []);

  const [barbershops, setBarbershops] = useState<Barbershop[] | null>();

  useEffect(() => {
    (async () => {
      const barbershops = await getBarbershops();
      setBarbershops(barbershops);
    })();
  }, []);

  return (
    <div className="container mt-24  mx-auto flex">
      <div className="grid md:grid-cols-4 gap-4 justify-items-center">
        {barbershops?.map((barbershop) => (
          <div className="w-10/12 border p-2 rounded-lg relative group bg-white hover:cursor-pointer hover:shadow-lg">
            <div className="rounded-md overflow-hidden">
              <img src={barbershop.image} className="w-full object-cover" />
            </div>
            <div className="grid gap-4">
              <h2 className="font-medium w-11/12 justify-center flex m-auto border-b p-2">
                {barbershop.name.toUpperCase()}
              </h2>

              <Link to={""} className="button-normal">
                Hacer Cita
              </Link>
            </div>

            <div
              className=" hidden md:block absolute group-hover:-bottom-[12rem] left-0 mx-auto   
              rounded-lg group-hover:shadow-xl 
               z-[-2] transition-all duration-500 h-fit bg-white p-1 border w-full justify-center bottom-0"
            >
              <h3 className="text-orange-600 text-base font-bold  mx-auto w-fit flex mb-2">
                Servicios
              </h3>
              <div className="h-fit grid gap-2 w-11/12 mx-auto">
                {barbershop.services.map((s) => (
                  <div className="bg-blue-500 p-2 rounded w-full h-fit text-center text-white">
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
