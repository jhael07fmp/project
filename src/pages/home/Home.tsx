/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Barber, Barbershop } from "../../interfaces/Interfaces";
import { getBarbershops } from "../../api/barbershops";
import { getBarbers } from "../../api/barbers";
import { useNavbarContext } from "../../context/NavbarContext";
import CardDetail from "../../components/cards/CardDetail";

export const Home = () => {
  const { searchTerm } = useNavbarContext();

  const [filterItems, setFilterItems] = useState<Barbershop[] | Barber[] | null | any>();
  const [items, setItems] = useState<Barbershop[] | Barber[] | null | any>();

  useEffect(() => {
    (async () => {
      const barbershops = await getBarbershops();
      const barbers = await getBarbers();
      setItems([...barbershops, ...barbers]);
      setFilterItems([...barbershops, ...barbers]);
    })();
  }, []);

  useEffect(() => {
    if (items?.length > 0) {
      const filterItems: Barbershop[] | Barber[] | any = items?.filter(
        ({ name }: { name: string }) => {
          return name?.toLowerCase()?.includes(searchTerm?.toLowerCase());
        }
      );
      setFilterItems(filterItems);
    } else {
      setFilterItems([1, 2, 3, 4]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <div className="container mt-24  mx-auto flex">
      {filterItems?.length > 0 && (
        <div className="grid md:grid-cols-4 gap-4 justify-items-center w-full">
          {filterItems?.map((item: Barber, i: number) => (
            <div className="w-full flex justify-center" key={i}>
              <CardDetail
                services={item?.services}
                buttonTitle="Hacer Cita"
                image={item?.image}
                imageUrl={`/barber/${item?.id}`}
                name={item?.name}
                buttonUrl={
                  item?.barbershopId
                    ? `/appointment/${item?.barbershopId}/${item?.id}`
                    : `/appointment/${item?.id}`
                }
              />
            </div>
          ))}
        </div>
      )}

      {filterItems?.length === 0 && (
        <div className="container border rounded-md mx-auto p-4">No hay Data</div>
      )}
    </div>
  );
};
