import { useForm } from "react-hook-form";
import OptionsBar from "../../../components/OptionsBar/OptionsBar";
import GoBackButton from "../../../components/buttons/GoBackButton";
import { handleError } from "../create/NewBarbershop";
import InputCustom from "../../../components/Form/Inputs/InputCustom";

const CreateEmployees = () => {
  const { handleSubmit, register } = useForm();
  return (
    <div className="page-container">
      <OptionsBar>
        <p className="text-orange-900">Crear Nuevo Empleado</p>
        <GoBackButton />
      </OptionsBar>

      <div className="container border p-4 mt-4 rounded-md">
        {" "}
        <form onSubmit={handleSubmit((data) => {}, handleError)}>
          <div className="w-11/12 md:w-7/12 mx-auto   p-2 rounded-md">
            <div className="form-normal-grid">
              <InputCustom
                label="Nombre"
                name="name"
                placeholder="Escribe el nombre del local"
                register={register}
                rules={{
                  required: {
                    value: true,
                    message: "Barber name is required",
                  },
                }}
              />
              <InputCustom
                label="Email"
                name="email"
                placeholder="Escribe la dirección email"
                register={register}
                rules={{
                  required: {
                    value: true,
                    message: "Email address is required.",
                  },
                }}
              />
              <InputCustom
                label="Cédula"
                name="taxId"
                placeholder="Escribe la cédula"
                register={register}
                rules={{
                  required: { value: true, message: "RNC is required." },
                }}
              />
              <InputCustom
                label="Selecciona la barberia"
                name="barbershopId"
                placeholder="Selecciona la barberia"
                register={register}
                type="select"
                options={[]}
              />
            </div>
          </div>
          <div className="flex justify-center md:justify-end w-[96%] ">
            <div className="w-11/12 md:w-24">
              <button className="button-sm p-2">Crear</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployees;
