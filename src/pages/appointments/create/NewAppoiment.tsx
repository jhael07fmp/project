/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import OptionsBar from "../../../components/OptionsBar/OptionsBar";
import GoBackButton from "../../../components/buttons/GoBackButton";
import { useEffect, useState } from "react";
import { getBarbershop } from "../../../api/barbershops";
import { getBarber } from "../../../api/barbers";
import InputCustom from "../../../components/Form/Inputs/InputCustom";
import { useForm } from "react-hook-form";
import { handleError } from "../../barbershops/create/NewBarbershop";
import { Appointment, Barber, Barbershop } from "../../../interfaces/Interfaces";
import { useAuthContext } from "../../../context/authContext";
import { postAppointment } from "../../../api/appoitment";
import { User } from "firebase/auth";
import { message } from "antd";

const NewAppoiment = () => {
  const { currentUser: getuser } = useAuthContext();

  const { barbershopId, barberId } = useParams();
  const { handleSubmit, register, setValue, watch } = useForm();
  const [barbershop, setBarbershop] = useState<Barbershop>();
  const [barber, setBarber] = useState<Barber>();
  const [options, setOptions] = useState<{ label: string; value: number | string }[]>();
  const [currentUser, setCurrentUser] = useState<User | null>();

  useEffect(() => {
    (async () => {
      setCurrentUser(await getuser());

      if (barbershopId) {
        const barbershop = await getBarbershop(barbershopId!);
        setBarbershop(barbershop);
        setOptions(barbershop?.services.map((service) => ({ label: service, value: service })));
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
              <h1 className="text-sky-600 bg-white w-fit p-1.5 rounded-lg font-medium 2xl:text-xl">
                {barbershop?.name?.toUpperCase()}
              </h1>
            ) : (
              <h1 className="text-sky-600 bg-yellow-100 w-28 h-8 p-1.5 rounded-lg font-medium text-sm 2xl:text-xl "></h1>
            )}
          </div>
          <div className="grid gap-4">
            <h2 className="font-medium">Barbero</h2>

            {barber?.name ? (
              <h1 className="text-sky-600 bg-white w-fit p-1.5 rounded-lg font-medium 2xl:text-xl">
                {barber?.name?.toUpperCase()}
              </h1>
            ) : (
              <h1 className="text-sky-600 bg-yellow-100 w-28 h-8 p-1.5 rounded-lg font-medium text-xl "></h1>
            )}
          </div>
        </div>

        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              const id = crypto.randomUUID() + "c";
              const dataForm = {
                ...data,
                id,
                barberId: barber?.id,
                barbershopId: barber?.barbershopId,
                userId: currentUser?.uid,
                dateInMillis: new Date(watch("dateInMillis")).getTime(),
                status: "open",
                customerName: currentUser?.displayName,
              };

              await postAppointment(id, dataForm as Appointment);
              message.success("Cita Agendada", 2);
            } catch (err: any) {
              message.success(err.message, 2);
            }
          }, handleError)}
        >
          <div className="w-11/12 md:w-7/12 mx-auto   p-2 rounded-md">
            <div className="form-normal-grid">
              <InputCustom
                label="Selecciona la Fecha"
                name="dateInMillis"
                placeholder="Selecciona la Fecha"
                register={register}
                setValue={setValue}
                type="datetime"
                rules={{ required: { value: true, message: "date is required" } }}
              />

              <InputCustom
                label="Servicio"
                name="service"
                placeholder="Separa cada servicio con una coma (,)"
                register={register}
                options={options}
                setValue={setValue}
                disabled={!watch("dateInMillis")}
                type="select"
                rules={{ required: { value: true, message: "Service is required" } }}
              />
            </div>
          </div>
          <div className="flex justify-center md:justify-end w-[96%] ">
            <div className="w-fit flex justify-end">
              <button
                className="button-sm p-2 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                disabled={!watch("dateInMillis") || !watch("service")}
              >
                Agendar Cita
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAppoiment;
