import { useEffect, useState } from "react";
import OptionsBar from "../../../components/OptionsBar/OptionsBar";
import GoBackButton from "../../../components/buttons/GoBackButton";
import CardNormal from "../../../components/cards/CardNormal";
import { getBarberByBarbershopId } from "../../../api/barbershops";
import { useParams } from "react-router-dom";
import { Barber } from "../../../interfaces/Interfaces";

const ViewEmployees = () => {
  const { id } = useParams();
  const [barbers, setBarbers] = useState<Barber[]>();
  useEffect(() => {
    (async () => {
      setBarbers(await getBarberByBarbershopId(id!));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-container">
      <OptionsBar>
        <p className="text-orange-900">Empleados</p>
        <GoBackButton />
      </OptionsBar>

      <div className="w-full border p-4 mt-4 rounded-md">
        <div className="grid md:grid-cols-4 gap-4 justify-items-center">
          {barbers?.map((barber) => (
            <CardNormal
              buttonTitle="Agendar Cita"
              cardTitle={barber.name}
              image={
                barber.image ??
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHjLSBwIMa-ASwokA4L9bnZ7BU80W9B9WZF46O00RPH3IJFFJtIhyUNrOdC6FXdYKUx-E&usqp=CAU"
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewEmployees;
