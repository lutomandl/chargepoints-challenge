import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FormInputs } from '../types/types';

interface RadioInputProps {
  name: keyof FormInputs;
  label: string;
  setValue: UseFormSetValue<FormInputs>;
  watch: UseFormWatch<FormInputs>;
  options: { label: string; value: number }[];
}

export default function RadioInput({
  name,
  label,
  options,
  setValue,
  watch,
}: RadioInputProps) {
  const value = watch(name) || 0;

  return (
    <div className="flex flex-col items-start gap-2 w-full md:w-96">
      <label htmlFor={name}>{label}</label>
      <div className="flex flex-col gap-2 items-start">
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <input
              type="radio"
              id={option.value.toString()}
              checked={value === option.value}
              onChange={() => setValue(name, option.value)}
              value={option.value}
              className="font-normal"
            />
            <span className="text-lg">{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
