import {
  FieldError,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import plus from '../assets/plus.svg';
import minus from '../assets/minus.svg';
import { FormInputs } from '../types/InputTypes';
import { MAX_CHARGE_POINTS, MIN_CHARGE_POINTS } from '../utils/constants';

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
    <div className="flex flex-col gap-2 w-96 mx-auto">
      <label
        htmlFor={name}
        className="flex gap-2 text-gray-600 text-lg font-bold"
      >
        {label}
      </label>
      <div className="relative flex items-center max-w-[8rem]">
        <button
          type="button"
          onClick={handleDecrement}
          className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-900 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
        >
          <img src={minus} alt="minus" />
        </button>
        <input
          id={name}
          type="number"
          className={`bg-gray-50 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 ${
            error ? 'border-2 border-red-500' : ''
          }`}
          {...register(name, {
            valueAsNumber: true,
          })}
        />
        <button
          type="button"
          onClick={handleIncrement}
          className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-900 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
        >
          <img src={plus} alt="plus" />
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
