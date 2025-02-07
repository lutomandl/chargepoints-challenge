import * as yup from 'yup';
import {
  CHARGING_POWER_OPTIONS,
  MAX_ARRIVAL_PROBABILITY,
  MAX_CAR_CONSUMPTION,
  MAX_CHARGE_POINTS,
  MIN_ARRIVAL_PROBABILITY,
  MIN_CAR_CONSUMPTION,
  MIN_CHARGE_POINTS,
} from './constants';

export const inputFormSchema = yup.object().shape({
  chargePoints: yup
    .number()
    .positive('Charge points must be a positive number')
    .integer('Charge points must be a whole number')
    .min(MIN_CHARGE_POINTS, 'At least one charge point is required')
    .max(MAX_CHARGE_POINTS, 'Maximum 200 charge points allowed')
    .required('Number of charge points is required')
    .typeError('Charge points must be a number'),

  arrivalProbability: yup
    .number()
    .positive('Arrival probability must be positive')
    .min(MIN_ARRIVAL_PROBABILITY, 'Minimum arrival probability is 20%')
    .max(MAX_ARRIVAL_PROBABILITY, 'Maximum arrival probability is 200%')
    .required('Arrival probability is required'),

  carConsumption: yup
    .number()
    .positive('Car consumption must be positive')
    .min(MIN_CAR_CONSUMPTION, 'Minimum car consumption is 1 kWh')
    .max(MAX_CAR_CONSUMPTION, 'Maximum car consumption is 100 kWh')
    .required('Car consumption is required'),

  chargingPower: yup
    .number()
    .oneOf(CHARGING_POWER_OPTIONS, 'Invalid charging power')
    .required('Charging power is required'),
});
