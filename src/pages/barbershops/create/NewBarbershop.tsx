import { useForm } from "react-hook-form";
import InputCustom from "../../../components/Form/Inputs/InputCustom";
import OptionsBar from "../../../components/OptionsBar/OptionsBar";
import { useNavigate } from "react-router-dom";
import { postBarbershop } from "../../../api/barbershops";
import { Barbershop } from "../../../interfaces/Interfaces";
import GoBackButton from "../../../components/buttons/GoBackButton";

const NewBarbershop = () => {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const handleSuccess = async (data: any) => {
    try {
      const id = crypto.randomUUID();
      await postBarbershop(id, {
        ...(data as Barbershop),
        services: data.services.split(","),
        id,
      });
      navigate("/barbershops");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="w-11/12 mx-auto mt-24">
      <OptionsBar>
        <p className="text-orange-900">Crear Nuevo Local</p>
        <GoBackButton />
      </OptionsBar>

      <div className="container border p-4 mt-4 rounded-md">
        <form onSubmit={handleSubmit(handleSuccess, handleError)}>
          <div className="w-11/12 md:w-7/12 mx-auto   p-2 rounded-md">
            <div className="form-normal-grid">
              <InputCustom
                label="Nombre Local"
                name="name"
                placeholder="Escribe el nombre del local"
                register={register}
                rules={{
                  required: {
                    value: true,
                    message: "Branch office name is required",
                  },
                  minLength: 1,
                }}
              />
              <InputCustom
                label="Dirección"
                name="address"
                placeholder="Escribe la dirección"
                register={register}
                rules={{
                  required: { value: true, message: "Address is required." },
                }}
              />
              <InputCustom
                label="RNC"
                name="taxId"
                placeholder="Escribe el RNC"
                register={register}
                rules={{
                  required: { value: true, message: "RNC is required." },
                }}
              />
              <InputCustom
                label="Logo"
                name="image"
                placeholder="Escribe la url del logo del negocio"
                register={register}
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
            <div className="w-11/12 md:w-24">
              <button className="button-sm p-2">Crear</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBarbershop;

export const handleError = (err: any) => {
  const errorToShow = Object.keys(err);
  alert(err[errorToShow[0]]?.message);
};
