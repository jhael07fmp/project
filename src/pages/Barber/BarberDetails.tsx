import { useParams } from "react-router-dom";
import OptionsBar from "../../components/OptionsBar/OptionsBar";
import GoBackButton from "../../components/buttons/GoBackButton";
import { useEffect, useState } from "react";
import { getBarber } from "../../api/barbers";
import { Appointment, Barber } from "../../interfaces/Interfaces";
import { getWhereCondition, update } from "../../api/methods";
import { where } from "firebase/firestore";
import { useAuthContext } from "../../context/authContext";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const BarberDetails = () => {
  const { id } = useParams();
  const [barber, setBarber] = useState<Barber>();
  const [appointment, setAppointment] = useState<Appointment[]>();
  const { userData } = useAuthContext();
  const [hasStatusChanged, setHasStatusChanged] = useState(false);

  function addDays(date2: Date, days: number) {
    date2.setDate(date2.getDate() + days);
    return date2;
  }

  useEffect(() => {
    (async () => {
      const barber = await getBarber(id!);
      setBarber(barber);

      const appointmentsArr = await getWhereCondition<Appointment>({
        colletionName: "appointments",
        condition: where("barberId", "==", id),
      });
      setAppointment(
        appointmentsArr.filter(
          ({ dateInMillis }) =>
            dateInMillis > addDays(new Date(), -1).getTime() && dateInMillis <= new Date().getTime()
        )
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStatusChanged]);

  return (
    <div className="page-container">
      <OptionsBar>
        <p className="text-orange-900">Barbero: {barber?.name}</p>
        {!userData.roles?.includes("employee") && <GoBackButton />}
      </OptionsBar>

      <div className="container border p-4 mt-4 rounded-md">
        <div className="grid grid-cols-2 gap-4">
          <div>
            {barber?.image ? (
              <div className="w-full rounded-md shadow-md overflow-hidden h-96  ">
                <img
                  src={barber?.image}
                  className="object-contain border aspect-[2/1] m-auto flex h-full "
                  alt="Branch office logo"
                />
              </div>
            ) : (
              <div className="w-full rounded-md shadow-md overflow-hidden h-96  bg-gray-200">
                <img
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHjLSBwIMa-ASwokA4L9bnZ7BU80W9B9WZF46O00RPH3IJFFJtIhyUNrOdC6FXdYKUx-E&usqp=CAU"
                  }
                  className="object-contain border aspect-[2/1] m-auto flex h-full"
                  alt="Branch office logo"
                />
              </div>
            )}
          </div>

          <div className="rounded-md border p-4">
            <h2 className="text-xl font-bold text-gray-600">Citas para el dia de hoy</h2>
            <div className="w-full max-w-xl border p-2 rounded-md mt-4 grid gap-4">
              {appointment?.map(({ customerName, dateInMillis, status, id }, i) => (
                <div
                  key={i}
                  className={`items-center flex gap-6 2xl:gap-10 border p-2 rounded-md ${
                    status === "closed" ? "bg-green-50" : ""
                  }
                  
                  ${status === "open" ? "bg-yellow-50 text-yellow-800" : ""}
                  ${status === "canceled" ? "bg-red-50" : ""}
                  `}
                >
                  <p className="text-lg rounded-full px-3 p-1 bg-blue-500 text-white">{i + 1} </p>
                  {!userData?.roles?.includes("customer") && (
                    <h2 className=" gap-0.5 grid w-full">
                      <span className="font-medium">Cliente:</span>
                      {customerName}
                    </h2>
                  )}
                  <div className="grid gap-0.5 w-full">
                    <span className="font-medium">Hora: </span>

                    {new Date(dateInMillis).toLocaleTimeString()}
                  </div>
                  {!userData?.roles?.includes("customer") && (
                    <div className="grid gap-2 w-full">
                      <span className="font-medium">Estado:</span>
                      <span>
                        {status === "open" && "En turno ⌚"}{" "}
                        {status === "canceled" && "Cancelado ❌"}
                        {status === "closed" && "Atendido ✅"}
                      </span>
                    </div>
                  )}

                  {status === "open" && userData.roles?.includes("employee") && (
                    <div className="flex gap-2  justify-center">
                      <button
                        onClick={() => {
                          setHasStatusChanged((prev: boolean) => !prev);
                          update({
                            id,
                            colletionName: "appointments",
                            propName: "status",
                            value: "closed",
                          });
                        }}
                        className="p-2 rounded-md border hover:bg-green-600 group transition-all active:scale-95 bg-white"
                      >
                        <FaCheck className="text-green-600 group-hover:text-white" />
                      </button>
                      <button
                        onClick={() => {
                          setHasStatusChanged((prev: boolean) => !prev);
                          update({
                            id,
                            colletionName: "appointments",
                            propName: "status",
                            value: "canceled",
                          });
                        }}
                        className="p-[0.45rem] rounded-md border hover:bg-red-600 group transition-all active:scale-95 bg-white"
                      >
                        <IoMdClose className="text-red-600 group-hover:text-white text-xl" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarberDetails;
