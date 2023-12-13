import { useForm } from "react-hook-form";
import InputCustom from "../../../components/Form/Inputs/InputCustom";

const NewBarbershop = () => {
  const { handleSubmit, register } = useForm();
  return (
    <div className="container mx-auto mt-24">
      <div className="w-full rounded-md bg-yellow-400 p-4 text-xl font-medium flex items-center justify-between">
        <p className="text-orange-900">Crear nuevo Negocio</p>
      </div>

      <div className="container border p-4 mt-4 rounded-md">
        <div className="w-7/12 mx-auto   p-2 rounded-md">
          <form
            onSubmit={handleSubmit(
              (data) => {},
              (err) => {}
            )}
          >
            <div className="w-full grid grid-cols-2 gap-20">
              <InputCustom
                label="Nombre"
                name="name"
                placeholder="Escribe el nombre"
                register={register}
              />
              <InputCustom
                label="Nombre"
                name="name"
                placeholder="Escribe el nombre"
                register={register}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBarbershop;
