import { useParams } from "react-router-dom";
import OptionsBar from "../../components/OptionsBar/OptionsBar";
import GoBackButton from "../../components/buttons/GoBackButton";
import { useEffect, useState } from "react";
import { getBarber } from "../../api/barbers";
import { Appointment, Barber } from "../../interfaces/Interfaces";
import { getWhereCondition } from "../../api/methods";
import { where } from "firebase/firestore";
import { useAuthContext } from "../../context/authContext";

const BarberDetails = () => {
  const { id } = useParams();
  const [barber, setBarber] = useState<Barber>();
  const [appointment, setAppointment] = useState<Appointment[]>();
  const { userData } = useAuthContext();

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
            dateInMillis > addDays(new Date(), -1).getTime() &&
            dateInMillis < addDays(new Date(), 1).getTime()
        )
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(userData);
  return (
    <div className="page-container">
      <OptionsBar>
        <p className="text-orange-900">Barbero: {barber?.name}</p>
        <GoBackButton />
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
            <div className="w-11/12 border p-2 rounded-md mt-4 grid gap-4">
              {appointment?.map(({ customerName, dateInMillis, status }, i) => (
                <div key={i} className="items-center flex gap-4 border p-4 rounded-md">
                  <p className="text-lg rounded-full px-3 p-1 bg-blue-500">{i + 1} </p>
                  {!userData?.roles?.includes("customer") && (
                    <h2 className="flex gap-2">
                      Cliente: <span>{customerName}</span>
                    </h2>
                  )}
                  <p>
                    <span className="font-medium">Hora: </span>

                    {new Date(dateInMillis).toLocaleTimeString()}
                  </p>
                  {!userData?.roles?.includes("customer") && (
                    <p>
                      Estado: {status === "open" && "En turno ⌚"}{" "}
                      {status === "canceled" && "Cancelada ❌"}
                      {status === "closed" && "Cerrada ✅"}
                    </p>
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
