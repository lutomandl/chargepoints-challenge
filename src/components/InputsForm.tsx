import { useForm, SubmitHandler } from 'react-hook-form';
import NumberInput from './NumberInput';
import { CalculationData, FormInputs } from '../types/types';
import { yupResolver } from '@hookform/resolvers/yup';
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
import { Dispatch, SetStateAction, useState } from 'react';
import loader from '../assets/loader.svg';
import { inputFormSchema } from '../utils/inputSchema';
import generateCalculationData from '../utils/simulateCalculation';
import ev from '../assets/ev-graphic.svg';

interface InputFormProps {
  setCalculationResults: Dispatch<SetStateAction<CalculationData | null>>;
}

export default function InputsForm({ setCalculationResults }: InputFormProps) {
  const [loading, setLoading] = useState(false);
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
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    // simulating BE calculation
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCalculationResults(generateCalculationData(data));
    }, 3000);
  };

  return (
    <section className="flex flex-col items-center m-12 w-full lg:max-w-4xl">
      <h2>Input parameters</h2>
      <p>Select the paramenters below and proceed with calculation.</p>
      <img
        src={ev}
        alt="ilustration of electric car"
        width={300}
        height={300}
      />
      <form
        className="m-8 flex flex-col items-center gap-8 w-full"
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
        <button type="submit" className="w-full md:w-96">
          {loading ? (
            <img src={loader} height={24} width={24} className="animate-spin" />
          ) : (
            'Calculate'
          )}
        </button>
      </form>
    </section>
  );
}
