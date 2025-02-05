import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { FormInputs } from '../types/InputTypes';

interface SliderInputPorps {
  label: string;
  name: keyof FormInputs;
  min: number;
  max: number;
  step: number;
  unit?: string;
  register: UseFormRegister<FormInputs>;
  watch: UseFormWatch<FormInputs>;
}

export default function SliderInput({
  label,
  name,
  min,
  max,
  step,
  unit,
  watch,
  register,
}: SliderInputPorps) {
  const value = watch(name) || 0;

  return (
    <div className="flex flex-col gap-2 max-w-96">
      <label
        htmlFor={name}
        className="flex gap-2 text-gray-600 text-lg font-bold"
      >
        {label}
      </label>
      <div className="flex justify-between max-w-96 text-sm text-gray-600 mb-1">
        <span>
          {min} {unit ?? ''}
        </span>
        <span>
          {value} {unit ?? ''}
        </span>
        <span>
          {max} {unit ?? ''}
        </span>
      </div>
      <input
        id={name}
        type="range"
        min={min}
        max={max}
        step={step}
        {...register(name)}
        className="max-w-96 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}
