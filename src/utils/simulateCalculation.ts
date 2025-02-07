import { CalculationData, FormInputs } from '../types/types';

export default function generateCalculationData(
  params: FormInputs
): CalculationData {
  const { chargePoints, arrivalProbability, carConsumption } = params;

  // Generate charge points with realistic usage patterns
  const chargePointsArray = Array.from({ length: chargePoints }, (_, i) => {
    const type = ['11kW', '22kW', '50kW'][Math.floor(Math.random() * 3)] as
      | '11kW'
      | '22kW'
      | '50kW';
    const power = parseInt(['11', '22', '50'][Math.floor(Math.random() * 3)]);

    // Create realistic daily usage pattern
    const usage = Array.from({ length: 24 }, (_, hour) => {
      // Peak hours (8-10 AM, 4-6 PM)
      if ((hour >= 8 && hour <= 10) || (hour >= 16 && hour <= 18)) {
        return Math.random() * arrivalProbability * 0.02 * power;
      }
      // Off-peak hours
      return Math.random() * arrivalProbability * 0.005 * power;
    });

    return {
      id: i,
      type,
      power,
      usage,
      events: {
        daily: Math.floor(arrivalProbability * 0.2),
        weekly: Math.floor(arrivalProbability * 1.4),
        monthly: Math.floor(arrivalProbability * 6),
        yearly: Math.floor(arrivalProbability * 72),
      },
    };
  });

  // Calculate totals and time series
  const totalEnergy = chargePointsArray.reduce(
    (sum, cp) =>
      sum + (cp.usage.reduce((d, u) => d + u, 0) * carConsumption) / 1000,
    0
  );

  const peakPower = Math.max(
    ...chargePointsArray.map((cp) => Math.max(...cp.usage))
  );

  // Generate time series data
  const timeSeries = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    power: chargePointsArray.reduce((sum, cp) => sum + cp.usage[hour], 0),
    energy: chargePointsArray.reduce(
      (sum, cp) => sum + (cp.usage[hour] * carConsumption) / 1000,
      0
    ),
    events: chargePointsArray.reduce(
      (sum, cp) => sum + (cp.usage[hour] > 0 ? 1 : 0),
      0
    ),
  }));

  return {
    chargePoints: chargePointsArray,
    totalEnergy,
    peakPower,
    events: {
      daily: chargePointsArray.reduce((sum, cp) => sum + cp.events.daily, 0),
      weekly: chargePointsArray.reduce((sum, cp) => sum + cp.events.weekly, 0),
      monthly: chargePointsArray.reduce(
        (sum, cp) => sum + cp.events.monthly,
        0
      ),
      yearly: chargePointsArray.reduce((sum, cp) => sum + cp.events.yearly, 0),
    },
    timeSeries,
  };
}
