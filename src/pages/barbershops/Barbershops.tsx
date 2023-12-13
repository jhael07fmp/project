import { useEffect, useState } from "react";
import { Barbershop } from "../../interfaces/Interfaces";
import { getBarbershops } from "../../api/barbershops";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

const Barbershops = () => {
  const [barbershops, setBarbershops] = useState<Barbershop[]>();

  useEffect(() => {
    (async () => {
      const data = await getBarbershops();
      setBarbershops(data);
    })();
  }, []);

  return (
    <div className="container mx-auto mt-24">
      <div className="w-full rounded-md bg-yellow-400 p-4 text-xl font-medium flex items-center justify-between">
        <p className="text-orange-900">Tus Negocios</p>

        <div className="w-fit gap-4 flex items-center px-2">
          <Link
            to={"/barbershops/new"}
            className="bg-white text-orange-800 p-2 
          rounded-md hover:bg-green-50 hover:text-green-500 transition-all"
          >
            <FaPlus />
          </Link>
        </div>
      </div>
      <div className="w-full border p-4 mt-4 rounded-md">
        <div className="grid md:grid-cols-4 gap-4 justify-items-center">
          {barbershops ? (
            barbershops?.map((barbershop) => (
              <div className="w-10/12 border p-2 rounded-lg relative group bg-white hover:cursor-pointer hover:shadow-lg">
                <div className="rounded-md overflow-hidden">
                  <img src={barbershop.image} className="w-full object-cover" />
                </div>
                <div className="grid gap-4">
                  <h2 className="font-medium w-11/12 justify-center flex m-auto border-b p-2">
                    {barbershop.name.toUpperCase()}
                  </h2>

                  <Link to={""} className="button-normal">
                    Detalles
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="w-10/12 border p-2 rounded-lg relative group bg-white hover:cursor-pointer hover:shadow-lg">
              <div className="rounded-md overflow-hidden">
                <img
                  src={
                    "https://icons.veryicon.com/png/o/miscellaneous/contribution/empty-box-1.png"
                  }
                  className="w-full object-cover"
                />
              </div>
              <div className="grid gap-4">
                <h2 className="font-medium w-11/12 justify-center flex m-auto border-b p-2">
                  Nombre de la Barberia
                </h2>

                <Link to={""} className="button-normal">
                  Detalles
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Barbershops;
