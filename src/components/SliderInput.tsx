import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { FormInputs } from '../types';

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
    <div className="flex flex-col items-start gap-2 w-full md:w-96">
      <label htmlFor={name}>{label}</label>
      <div className="flex justify-between items-center w-full text-sm text-gray-600 mb-1">
        <span>
          {min} {unit ?? ''}
        </span>
        <span className="text-lg">
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
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}
