import { useForm, SubmitHandler } from 'react-hook-form';
import NumberInput from './NumberInput';
import { FormInputs } from '../types/InputTypes';
import { yupResolver } from '@hookform/resolvers/yup';
import { inputFormSchema } from '../utils/InputSchema';
import {
  CHARGING_POWER_OPTIONS,
  DEFAULT_ARRIVAL_PROBABILITY,
  DEFAULT_CAR_CONSUMPTION,
  DEFAULT_CHARGE_POINTS,
  DEFAULT_CHARGING_POWER,
  MAX_ARRIVAL_PROBABILITY,
  MAX_CAR_CONSUMPTION,
  MAX_CHARGE_POINTS,
  MIN_ARRIVAL_PROBABILITY,
  MIN_CAR_CONSUMPTION,
  MIN_CHARGE_POINTS,
} from '../utils/constants';
import SliderInput from './SliderInput';
import RadioInput from './RadioInput';

export default function InputsForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(inputFormSchema),
    defaultValues: {
      chargePoints: DEFAULT_CHARGE_POINTS,
      arrivalProbability: DEFAULT_ARRIVAL_PROBABILITY,
      carConsumption: DEFAULT_CAR_CONSUMPTION,
      chargingPower: DEFAULT_CHARGING_POWER,
    },
  });
  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);

  return (
    <form
      className="my-8 flex flex-col gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <NumberInput
        register={register}
        setValue={setValue}
        getValue={getValues}
        name="chargePoints"
        label="Number of Charge Points"
        min={MIN_CHARGE_POINTS}
        max={MAX_CHARGE_POINTS}
        error={errors.chargePoints?.message}
      />
      <SliderInput
        name="arrivalProbability"
        label="Probability of Arrival"
        min={MIN_ARRIVAL_PROBABILITY}
        max={MAX_ARRIVAL_PROBABILITY}
        step={10}
        unit="%"
        register={register}
        watch={watch}
      />
      <SliderInput
        name="carConsumption"
        label="Car Consumption"
        min={MIN_CAR_CONSUMPTION}
        max={MAX_CAR_CONSUMPTION}
        step={1}
        unit="kWh"
        register={register}
        watch={watch}
      />
      <RadioInput
        name="chargingPower"
        label="Charging Power"
        options={CHARGING_POWER_OPTIONS.map((power) => ({
          label: `${power} kW`,
          value: power,
        }))}
        setValue={setValue}
        watch={watch}
      />
      <button
        type="submit"
        className="max-w-96 bg-blue-500 text-white p-2 rounded"
      >
        Calculate
      </button>
    </form>
  );
}
