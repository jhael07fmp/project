import { useEffect, useState } from "react";
import OptionsBar from "../../../components/OptionsBar/OptionsBar";
import GoBackButton from "../../../components/buttons/GoBackButton";
import { useParams } from "react-router-dom";
import { getBarbershop } from "../../../api/barbershops";
import { Barbershop } from "../../../interfaces/Interfaces";
import RectangleSm from "../../../components/skeleton/RectangleSm";

const DetailsBarbershops = () => {
  const { id } = useParams();

  const [barbershopInfo, setBarberShopInfo] = useState<Barbershop>();

  useEffect(() => {
    (async () => {
      setBarberShopInfo(await getBarbershop(id as string));
    })();
  }, []);

  console.log(barbershopInfo);

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
          <div className="border-t border-b grid grid-cols-2 p-2">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsBarbershops;
