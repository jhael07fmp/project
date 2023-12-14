/* eslint-disable @typescript-eslint/no-explicit-any */

import { Message, ValidationRule } from "react-hook-form";

/* eslint-disable @typescript-eslint/ban-types */
export type InputCustomType = {
  label: string;
  register: Function;
  rules?: Partial<{
    required: Message | ValidationRule<boolean>;
    min: ValidationRule<number | string>;
    max: ValidationRule<number | string>;
    maxLength: ValidationRule<number>;
    minLength: ValidationRule<number>;
    setValueAs: (value: any) => any;
    shouldUnregister?: boolean | undefined;
    onChange?: ((event: any) => void) | undefined;
    onBlur?: ((event: any) => void) | undefined;
    disabled: boolean;
  }>;
  name: string;
  placeholder: string;
  disabled?: boolean;
  type?:
    | "select"
    | "text"
    | "number"
    | "date"
    | "datetime"
    | "radius"
    | "upload"
    | "tablaAmortizacion"
    | "password";
  setValue?: Function;
  defaultValue?: string | number | boolean | Date;
  options?: { label: string; value: string | number }[];
  watch?: Function;
  isVisible?: boolean;
  modalContent?: React.ReactNode;
};
