import {
  FieldError,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import plus from '../assets/plus.svg';
import minus from '../assets/minus.svg';
import { FormInputs } from '../types/types.ts';
import { MAX_CHARGE_POINTS, MIN_CHARGE_POINTS } from '../utils/constants.ts';

interface NumberInputProps {
  label: string;
  name: keyof FormInputs;
  register: UseFormRegister<FormInputs>;
  getValue: UseFormGetValues<FormInputs>;
  setValue: UseFormSetValue<FormInputs>;
  min: number;
  max: number;
  error?: FieldError['message'];
}

export default function NumberInput({
  label,
  name,
  register,
  getValue,
  setValue,
  min = MIN_CHARGE_POINTS,
  max = MAX_CHARGE_POINTS,
  error,
}: NumberInputProps) {
  const handleIncrement = () => {
    const currentValue = getValue(name) || 0;
    setValue(name, currentValue < max ? currentValue + 1 : currentValue);
  };

  const handleDecrement = () => {
    const currentValue = getValue(name) || 0;
    setValue(name, currentValue > min ? currentValue - 1 : currentValue);
  };

  return (
    <div className="flex flex-col items-start gap-2 w-full md:w-96">
      <label htmlFor={name}>{label}</label>
      <div className="relative flex items-center gap-0.5 w-full">
        <button onClick={handleDecrement}>
          <img src={minus} alt="minus" />
        </button>
        <input
          id={name}
          type="number"
          className={`bg-gray-50 border-gray-300 rounded-lg h-11 text-center text-gray-900  focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 ${
            error ? 'border-2 border-red-500' : ''
          }`}
          {...register(name, {
            valueAsNumber: true,
          })}
        />
        <button onClick={handleIncrement}>
          <img src={plus} alt="plus" />
        </button>
      </div>
      <p className="text-red-500 text-sm">{error ? error : ''}</p>
    </div>
  );
}
