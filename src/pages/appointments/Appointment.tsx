/* eslint-disable react-hooks/exhaustive-deps */
import OptionsBar from "../../components/OptionsBar/OptionsBar";
import { Calendar, Event } from "react-big-calendar";
import moment from "moment";
import { momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { getAppoitmentsRealtime } from "../../api/appoitment";
import { useAuthContext } from "../../context/authContext";
import { getUser } from "../../api/users";
import { Appointment as Appointments } from "../../interfaces/Interfaces";

const Appointment = () => {
  const { currentUser: user } = useAuthContext();
  const localizer = momentLocalizer(moment);

  const [events, setEvents] = useState<Event[]>();

  useEffect(() => {
    (async () => {
      const u = await user();
      const findUser = await getUser(u!.uid);
      //const ap = await getAppoitmentsWhere(findUser);

      getAppoitmentsRealtime(findUser, (appointments: Appointments[]) => {
        setEvents(
          appointments?.map(({ customerName, service, dateInMillis, status }) => ({
            title: `${status === "open" ? "🟠" : ""} ${status === "canceled" ? "🔴" : ""}

          ${status === "closed" ? "✅" : ""}
          ${customerName} - ${service} `,
            start: new Date(dateInMillis),
            end: new Date(dateInMillis),
          }))
        );
      });
      // setEvents(
      //   ap?.map(({ customerName, service, dateInMillis, status }) => ({
      //     title: `${status === "open" ? "🟠" : ""} ${status === "canceled" ? "🔴" : ""}

      //     ${status === "closed" ? "✅" : ""}
      //     ${customerName} - ${service} `,
      //     start: new Date(dateInMillis),
      //     end: new Date(dateInMillis),
      //   }))
      // );
    })();
  }, []);

  return (
    <div className="page-container">
      <OptionsBar>
        <p className="text-yellow-700">Ver Citas</p>
      </OptionsBar>
      <div className="container border p-4 mt-4 rounded-md h-screen">
        <Calendar culture="es-do" localizer={localizer} events={events} />
      </div>
    </div>
  );
};

export default Appointment;
