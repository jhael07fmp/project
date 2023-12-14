import { useEffect, useState } from "react";
import { Barbershop } from "../../interfaces/Interfaces";
import { getBarbershops } from "../../api/barbershops";
import { Link } from "react-router-dom";
import OptionsBar from "../../components/OptionsBar/OptionsBar";
import CreateButton from "../../components/buttons/CreateButton";

const Barbershops = () => {
  const [barbershops, setBarbershops] = useState<Barbershop[]>();

  useEffect(() => {
    (async () => {
      const data = await getBarbershops();
      setBarbershops(data);
    })();
  }, []);

  return (
    <div className="w-11/12 mx-auto mt-24">
      <OptionsBar>
        <p className="text-orange-900">Tus Negocios</p>
        <CreateButton url="/barbershops/new" />
      </OptionsBar>

      <div className="w-full border p-4 mt-4 rounded-md">
        {barbershops ? (
          <>
            <div className="grid md:grid-cols-4 gap-4 justify-items-center">
              {barbershops?.map((barbershop, i) => (
                <div
                  key={i}
                  className="w-10/12 border p-2 rounded-lg relative group bg-white hover:cursor-pointer hover:shadow-lg"
                >
                  <div className="rounded-md overflow-hidden">
                    {barbershop.image ? (
                      <img src={barbershop.image} className="w-full object-cover h-72" />
                    ) : (
                      <div className="h-72 bg-gray-100 flex justify-center items-center text-lg font-medium text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="grid gap-4">
                    <h2 className="font-medium w-11/12 justify-center flex m-auto border-b p-2">
                      {barbershop.name?.length < 30
                        ? barbershop.name.toUpperCase().substring(0, 21) + "..."
                        : barbershop.name.toUpperCase()}
                    </h2>

                    <Link to={`/barbershops/details/${barbershop.id}`} className="button-normal">
                      Detalles
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="grid md:grid-cols-4 gap-4 justify-items-center">
            {[1, 2, 3, 4].map((_item, i) => (
              <div
                key={i}
                className="w-10/12 border p-2 rounded-lg relative group bg-white hover:cursor-pointer hover:shadow-lg"
              >
                <div className="rounded-md overflow-hidden h-48 w-11/12 bg-gray-100 mx-auto"></div>
                <div className="grid gap-4">
                  <h2 className="font-medium w-11/12 justify-center flex mx-auto border-b p-4 rounded-md bg-gray-100 h-4 mt-4"></h2>

                  <Link to={""} className="button-normal">
                    Detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Barbershops;
