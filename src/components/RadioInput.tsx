import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FormInputs } from '../types/InputTypes';

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
    <div className="flex flex-col gap-2 max-w-96">
      <label
        htmlFor={name}
        className="flex gap-2 text-gray-600 text-lg font-bold"
      >
        {label}
      </label>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-2">
            <input
              type="radio"
              id={option.value.toString()}
              checked={value === option.value}
              onChange={() => setValue(name, option.value)}
              value={option.value}
              className="mr-2"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}
