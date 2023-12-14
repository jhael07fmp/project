/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/ban-types */
import { Select } from "antd";
const { Option } = Select;
import { InputCustomType } from "./types/types";

interface SelectCustomProps extends InputCustomType {
  setValue?: Function;
}

const SelectCustom = (props: SelectCustomProps) => {
  const {
    disabled,
    label,
    setValue,
    placeholder,
    name,
    defaultValue,
    options,
    rules,
  } = props;

  const optionsWithKeys = options?.map((option, i) => ({
    ...option,
    key: String(i),
  }));

  return (
    <>
      <p className="mb-2 font-sans text-slate-500 flex gap-2">
        {label} {rules?.required && <span className="text-red-500">*</span>}
      </p>
      <Select
        size="large"
        showSearch
        value={options?.find(({ value }) => value === defaultValue)?.value}
        disabled={disabled}
        className="w-full focus:border-blue-400 hover:bg-slate-100 hover:border-transparent"
        onChange={(value) => {
          if (!isNaN(Number(value))) setValue?.(name, Number(value));
          else setValue?.(name, value);
        }}
        placeholder={placeholder}
        optionFilterProp="children"
        filterOption={(input, option) => {
          const label = option?.children as unknown as string;
          return label?.toLowerCase().includes(input.toLowerCase() || input);
        }}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toString()
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toString().toLowerCase())
        }
      >
        {optionsWithKeys?.map(({ value, label, key }) => (
          <Option key={key} value={value}>
            {label}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default SelectCustom;

// value
// cuatrimesterQuantity
export const options = [
  {
    value: 1,
    label: "Desarrollo de Software",
    price: 200_000,
    timePerMonth: 64,
    interestRate: 8,
    cuatrimesterQuantity: 16,
    amoutPerCuatrimester: 12_500,
  },
  {
    value: 2,
    label: "TELECOMUNICACIONES",
    price: 600_000,
    timePerMonth: 80,
    interestRate: 0.8,
    cuatrimesterQuantity: 20,
    amoutPerCuatrimester: 30_000,
  },
  {
    value: 3,
    label: "INTELIGENCIA ARTIFICIAL",
    price: 900_000,
    timePerMonth: 64,
    interestRate: 0.8,
    cuatrimesterQuantity: 16,
    amoutPerCuatrimester: 56_250,
  },
  {
    value: 4,
    label: "ENERGÍAS RENOVABLES",
    price: 600_000,
    timePerMonth: 80,
    interestRate: 0.8,
    cuatrimesterQuantity: 20,
    amoutPerCuatrimester: 30_000,
  },
  {
    value: 5,
    label: "MECATRÓNICA",
    price: 700_000,
    timePerMonth: 64,
    interestRate: 0.8,
    cuatrimesterQuantity: 16,
    amoutPerCuatrimester: 43_750,
  },
  {
    value: 6,
    label: "MULTIMEDIA",
    price: 500_000,
    timePerMonth: 80,
    interestRate: 0.8,
    cuatrimesterQuantity: 20,
    amoutPerCuatrimester: 25_000,
  },
  {
    value: 7,
    label: "SEGURIDAD INFORMÁTICA",
    price: 200_000,
    timePerMonth: 64,
    interestRate: 0.8,
    cuatrimesterQuantity: 16,
    amoutPerCuatrimester: 12_500,
  },
];

const showOptionsBaseOnNumber = (number: number) => {
  const arr: {
    label: string;
    value: string | number;
    key?: number | string;
  }[] = [];

  for (let i = 1; i <= number; i++) {
    arr.push({ label: String(i), value: i, key: i });
  }

  return arr;
};

export const cuatrimestreQuantity = options.map((props) => {
  const { value: id, cuatrimesterQuantity } = props;

  const cuatrimester = showOptionsBaseOnNumber(cuatrimesterQuantity);

  // prettier-ignore
  return { id, cuatrimester, };
});
