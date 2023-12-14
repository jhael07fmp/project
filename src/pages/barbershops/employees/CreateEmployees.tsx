import { useForm } from "react-hook-form";
import OptionsBar from "../../../components/OptionsBar/OptionsBar";
import GoBackButton from "../../../components/buttons/GoBackButton";
import { handleError } from "../create/NewBarbershop";
import InputCustom from "../../../components/Form/Inputs/InputCustom";
import { useEffect, useState } from "react";
import { getBarbershops } from "../../../api/barbershops";
import { createUser, signUp } from "../../../api/users";
import { postBarber } from "../../../api/barbers";

const CreateEmployees = () => {
  const { handleSubmit, register, setValue, reset, watch } = useForm();
  const [selectOptions, setSelectOptions] =
    useState<{ label: string; value: string | number }[]>();

  useEffect(() => {
    (async () => {
      const arrayBarbershops = await getBarbershops();
      const options = arrayBarbershops.map(({ name, id }) => ({
        label: name,
        value: id,
      }));

      setSelectOptions(options);
    })();
  }, []);

  return (
    <div className="page-container">
      <OptionsBar>
        <p className="text-orange-900">Crear Nuevo Empleado</p>
        <GoBackButton />
      </OptionsBar>

      <div className="container border p-4 mt-4 rounded-md">
        {" "}
        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              if (!data.barbershopId) {
                alert("Barbershop is required");
                return;
              }

              const userId = await createUser({
                email: data.email,
                password: data.password,
              });

              const id = crypto.randomUUID() + "b";

              const newBarber = {
                id,
                userId: userId!,
                taxId: data.taxId,
                barbershopId: data.barbershopId,
                name: data.name,
                email: data.email,
              };
              await signUp({
                id,
                email: data.email,
                name: data.name,
                address: data.address,
                roles: ["employee"],
              });
              await postBarber(id, newBarber);

              alert("Barbero created Successfully");
              reset();
              setValue("barbershopId", "");
            } catch (err) {
              handleError(err);
            }
          }, handleError)}
        >
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
                label="Cédula"
                name="taxId"
                placeholder="Escribe la cédula"
                register={register}
                rules={{
                  required: { value: true, message: "RNC is required." },
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
                label="Contraseña"
                name="password"
                placeholder="Escribe la contraseña"
                register={register}
                type="password"
                rules={{
                  required: {
                    value: true,
                    message: "Email address is required.",
                  },
                }}
              />
              <InputCustom
                label="Dirección"
                name="address"
                placeholder="Escribe la dirección"
                register={register}
              />
              <InputCustom
                label="Selecciona la barberia"
                name="barbershopId"
                placeholder="Selecciona la barberia"
                register={register}
                type="select"
                options={selectOptions}
                setValue={setValue}
                defaultValue={watch("barbershopId")}
                rules={{
                  required: { value: true, message: "Barbershop is required" },
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

export default CreateEmployees;
