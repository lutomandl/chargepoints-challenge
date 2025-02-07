import { BarChartData, BubbleChartData, CalculationData } from '../types/types';

export const formatPowerByHours = (data: CalculationData): BarChartData => {
  return data.timeSeries.map(({ hour, power }) => ({
    xData: `${hour}:00`,
    yData: power,
  }));
};

export const formatEnergyByHours = (data: CalculationData): BarChartData => {
  return data.timeSeries.map(({ hour, energy }) => ({
    xData: `${hour}:00`,
    yData: energy,
  }));
};

export const formatMaxUsageByPoints = (data: CalculationData): BarChartData => {
  return data.chargePoints.map(({ id, usage }) => ({
    xData: (id + 1).toString(),
    yData: Math.max(...usage),
  }));
};

export const formatUsagePerPointPerHour = (
  data: CalculationData
): BubbleChartData => {
  return data.chargePoints.map(({ id, usage }) => ({
    row: id + 1,
    data: usage.map((u, i) => ({
      zData: u,
      xData: `${i}:00`,
      index: 1,
    })),
  }));
};
