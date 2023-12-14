import { useParams } from "react-router-dom";
import OptionsBar from "../../components/OptionsBar/OptionsBar";
import GoBackButton from "../../components/buttons/GoBackButton";
import { useEffect, useState } from "react";
import { getBarbershop } from "../../api/barbershops";
import { getBarber } from "../../api/barbers";
import InputCustom from "../../components/Form/Inputs/InputCustom";
import { useForm } from "react-hook-form";
import { handleError } from "../barbershops/create/NewBarbershop";
import { Barber, Barbershop } from "../../interfaces/Interfaces";

const NewAppoiment = () => {
  const { barbershopId, barberId } = useParams();
  const { handleSubmit, register } = useForm();
  const [barbershop, setBarbershop] = useState<Barbershop>();
  const [barber, setBarber] = useState<Barber>();

  useEffect(() => {
    (async () => {
      if (barbershopId) {
        const barbershop = await getBarbershop(barbershopId!);
        setBarbershop(barbershop);
      }

      if (barbershopId) {
        const barber = await getBarber(barberId!);
        setBarber(barber);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-container">
      <OptionsBar>
        <p className="text-yellow-800">Nueva Cita</p>
        <GoBackButton />
      </OptionsBar>
      <div className="container border p-4 mt-4 rounded-md">
        <div
          className="w-11/12 md:w-7/12 mx-auto  grid md:grid-cols-2 p-2 md:p-4 gap-10 md:gap-20 rounded-md border\
         text-white bg-gradient-to-t from-orange-500 to-yellow-500 shadow-md border border-yellow-400 "
        >
          <div className="grid gap-4">
            <h2 className="font-medium">Negocio</h2>
            {barbershop?.name ? (
              <h1 className="text-sky-600 bg-white w-fit p-1.5 rounded-lg font-medium text-xl">
                {barbershop?.name?.toUpperCase()}
              </h1>
            ) : (
              <h1 className="text-sky-600 bg-yellow-100 w-28 h-8 p-1.5 rounded-lg font-medium text-xl "></h1>
            )}
          </div>
          <div className="grid gap-4">
            <h2 className="font-medium">Barbero</h2>

            {barber?.name ? (
              <h1 className="text-sky-600 bg-white w-fit p-1.5 rounded-lg font-medium text-xl">
                {barber?.name?.toUpperCase()}
              </h1>
            ) : (
              <h1 className="text-sky-600 bg-yellow-100 w-28 h-8 p-1.5 rounded-lg font-medium text-xl "></h1>
            )}
          </div>
        </div>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          }, handleError)}
        >
          <div className="w-11/12 md:w-7/12 mx-auto   p-2 rounded-md">
            <div className="form-normal-grid">
              <InputCustom
                label="Selecciona la Fecha"
                name="name"
                placeholder="Selecciona la Fecha"
                register={register}
                type="datetime"
              />

              <InputCustom
                label="Servicios"
                name="services"
                placeholder="Separa cada servicio con una coma (,)"
                register={register}
                rules={{
                  required: {
                    value: true,
                    message: "At least one service is required is required.",
                  },
                }}
              />
            </div>
          </div>
          <div className="flex justify-center md:justify-end w-[96%] ">
            <div className="w-fit flex justify-end">
              <button className="button-sm p-2">Agendar Cita</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAppoiment;
