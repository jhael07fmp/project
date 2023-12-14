import { useEffect, useState } from "react";
import OptionsBar from "../../../components/OptionsBar/OptionsBar";
import GoBackButton from "../../../components/buttons/GoBackButton";
import { useParams } from "react-router-dom";
import { getBarbershop } from "../../../api/barbershops";
import { Barbershop } from "../../../interfaces/Interfaces";
import RectangleSm from "../../../components/skeleton/RectangleSm";
import { Link } from "react-router-dom";
import { MdRemoveRedEye } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

const DetailsBarbershops = () => {
  const { id } = useParams();

  const [barbershopInfo, setBarberShopInfo] = useState<Barbershop>();

  useEffect(() => {
    (async () => {
      setBarberShopInfo(await getBarbershop(id as string));
    })();
  }, []);

  return (
    <div className="page-container">
      <OptionsBar>
        {barbershopInfo?.name ? (
          <p className="text-orange-900">{barbershopInfo?.name}</p>
        ) : (
          <p className="bg-yellow-200 w-40 p-2 h-5 rounded-md"></p>
        )}
        <GoBackButton />
      </OptionsBar>

      <div className="container border p-4 mt-4 rounded-md">
        <div className="grid w-full gap-2 md:grid-cols-2">
          {barbershopInfo?.image ? (
            <div className="w-full rounded-md shadow-md overflow-hidden h-96">
              <img
                src={barbershopInfo?.image}
                className="object-contain border aspect-[2/1] m-auto flex h-full"
                alt="Branch office logo"
              />
            </div>
          ) : (
            <div className="w-full rounded-md shadow-md overflow-hidden h-96  bg-gray-100"></div>
          )}
          <div className="border-t border-b grid grid-cols-2 p-2 h-fit">
            <div className=" h-fit p-2">
              <p className="text-sm font-medium text-gray-500">Nombre</p>
              {barbershopInfo ? <p>{barbershopInfo?.name}</p> : <RectangleSm />}
            </div>
            <div className=" h-fit p-2">
              <p className="text-sm font-medium text-gray-500">Dirección</p>
              {barbershopInfo ? (
                <p>{barbershopInfo?.address}</p>
              ) : (
                <RectangleSm />
              )}
            </div>
            <div className=" h-fit p-2">
              <p className="text-sm font-medium text-gray-500 mb-4">
                Servicios
              </p>
              {barbershopInfo ? (
                <div className="flex flex-wrap gap-2">
                  {barbershopInfo?.services.map((service, i) => (
                    <div
                      key={i}
                      className="rounded-md bg-blue-500 p-2 text-white font-medium"
                    >
                      {service}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid gap-2">
                  {[1, 2, 3].map((_item, i) => (
                    <div key={i}>
                      <RectangleSm />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className=" h-full p-2">
              <p className="text-sm font-medium text-gray-500 mb-4">
                Empleados
              </p>
              <div className="w-8/12  flex gap-3">
                <Link to={""} className="button-employees">
                  <MdRemoveRedEye className="text-2xl" />
                </Link>
                <Link
                  to={`/barbershops/employees/new/${id}`}
                  className="button-employees"
                >
                  <FaPlus className="text-2xl" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsBarbershops;
