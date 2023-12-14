/* eslint-disable @typescript-eslint/no-explicit-any */

import { DatePicker, Modal, Radio } from "antd";
// import SelectCustom from "./SelectCustom";
import { InputCustomType } from "./types/types";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import UploadInput from "./UploadInput";
import { AiOutlineEye } from "react-icons/ai";
import SelectCustom from "./SelectCustom";

/* eslint-disable @typescript-eslint/ban-types */

const InputCustom = (props: InputCustomType) => {
  const {
    label,
    register,
    rules,
    name,
    placeholder,
    disabled,
    type = "text",
    setValue,
    defaultValue,
    options,
    isVisible,
    modalContent,
  } = props;

  const [radiusValue, setRadiusValue] = useState(false);

  useEffect(() => {
    if (defaultValue) setRadiusValue(defaultValue as boolean);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputsProps = {
    options,
    defaultValue,
    disabled,
    name,
    placeholder,
    required: rules?.required,
    setValue: setValue,
    label,
  };

  const handleChangeRadius = (e: any) => {
    setValue?.(name, e.target.value);
    setRadiusValue(e.target.value);
  };

  const handleChangeDate = (date: any) => {
    setValue?.(name, date?.$d);
  };

  const [isOpen, setIsOpen] = useState(false);

  switch (type) {
    case "select":
      return (
        <InputWrapper isVisible={isVisible}>
          <SelectCustom rules={rules} register={() => {}} {...inputsProps} />
        </InputWrapper>
      );

    case "tablaAmortizacion":
      return (
        <InputWrapper isVisible={isVisible}>
          <div className="mt-7 flex justify-center">
            <button
              disabled={disabled}
              className="w-fit mx-auto button-normal flex gap-2 items-center "
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(true);
              }}
            >
              Ver Tabla de Amortización
              <AiOutlineEye />
            </button>
            <Modal
              open={isOpen}
              onCancel={() => setIsOpen(false)}
              onOk={() => setIsOpen(false)}
              footer={null}
              width={"fit-content"}
            >
              {modalContent}
            </Modal>
          </div>
        </InputWrapper>
      );

    case "radius":
      return (
        <InputWrapper isVisible={isVisible}>
          <div className="grid place-items-center gap-4">
            <LabelForInput label={label} required={rules} />
            <Radio.Group onChange={handleChangeRadius} value={radiusValue}>
              <Radio value={true}>Si</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </div>
        </InputWrapper>
      );

    case "text":
      return (
        <InputWrapper isVisible={isVisible}>
          <LabelForInput label={label} required={rules} />
          <input
            type={type ? type : "text"}
            value={defaultValue}
            disabled={disabled}
            placeholder={placeholder}
            className={`border rounded-md p-2 w-full outline-none font-sans px-2.5 text-gray-600  ${
              disabled && "cursor-not-allowed text-gray-300"
            }
      focus:border-blue-400 hover:bg-slate-100 hover:border-transparent`}
            {...register!(name, rules)}
          />
        </InputWrapper>
      );
    case "password":
      return (
        <InputWrapper isVisible={isVisible}>
          <LabelForInput label={label} required={rules} />
          <input
            type={type}
            value={defaultValue}
            disabled={disabled}
            placeholder={placeholder}
            className={`border rounded-md p-2 w-full outline-none font-sans px-2.5 text-gray-600  ${
              disabled && "cursor-not-allowed text-gray-300"
            }
      focus:border-blue-400 hover:bg-slate-100 hover:border-transparent`}
            {...register!(name, rules)}
          />
        </InputWrapper>
      );

    case "number":
      return (
        <InputWrapper isVisible={isVisible}>
          <LabelForInput label={label} required={rules} />
          <input
            type={type ? type : "text"}
            disabled={disabled}
            placeholder={placeholder}
            step=".01"
            className={`border rounded-md p-2 w-full outline-none font-sans px-2.5 text-gray-600  ${
              disabled && "cursor-not-allowed text-gray-300"
            }
        focus:border-blue-400 hover:bg-slate-100 hover:border-transparent`}
            {...register!(name, rules)}
          />
        </InputWrapper>
      );

    case "upload":
      return (
        <InputWrapper isVisible={isVisible}>
          <LabelForInput label={label} required={rules} />
          <div className="mt-4 flex justify-center w-10/12">
            <UploadInput name={placeholder} />
          </div>
        </InputWrapper>
      );

    case "date":
      return (
        <InputWrapper>
          <LabelForInput label={label} required={rules} />
          <DatePicker
            format={"DD/MM/YYYY"}
            defaultValue={dayjs(defaultValue as Date)}
            placeholder={placeholder}
            className="w-full p-[0.6rem] border border-gray-200"
            onChange={handleChangeDate}
          />
        </InputWrapper>
      );
  }
};

export default InputCustom;

const InputWrapper = ({
  children,
  isVisible = true,
}: {
  children: React.ReactNode;
  isVisible?: boolean;
}) => {
  return (
    <>
      {isVisible ? (
        <div className="w-full min-w-[18rem]">{children}</div>
      ) : null}
    </>
  );
};

const LabelForInput = ({
  label,
  required,
}: {
  label: string;
  required: any;
}) => (
  <p className="mb-2 font-sans text-slate-500 flex gap-2">
    {label}{" "}
    {required?.required?.value && <span className="text-red-500">*</span>}{" "}
  </p>
);
