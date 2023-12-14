import { useParams } from "react-router-dom";
import OptionsBar from "../../components/OptionsBar/OptionsBar";
import GoBackButton from "../../components/buttons/GoBackButton";
import { useEffect } from "react";
import { getBarbershop } from "../../api/barbershops";
import { getBarber } from "../../api/barbers";

const NewAppoiment = () => {
  const { barbershopId, barberId } = useParams();

  useEffect(() => {
    (async () => {
      const barbershop = await getBarbershop(barbershopId!);
      const barber = await getBarber(barberId!);

      console.log(barbershop, barber);
    })();
  }, []);

  return (
    <div className="page-container">
      <OptionsBar>
        <GoBackButton />
      </OptionsBar>
    </div>
  );
};

export default NewAppoiment;
