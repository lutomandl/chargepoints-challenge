import {
  formatPowerByHours,
  formatEnergyByHours,
  formatMaxUsageByPoints,
  formatUsagePerPointPerHour,
} from '..';
import { CalculationData } from '../../types';

describe('formatChartData', () => {
  const mockData: CalculationData = {
    totalEnergy: 20,
    events: {
      daily: 30,
      weekly: 40,
      monthly: 50,
      yearly: 60,
    },
    peakPower: 40,
    timeSeries: [
      { hour: 0, power: 10, energy: 5, events: 20 },
      { hour: 1, power: 20, energy: 15, events: 40 },
    ],
    chargePoints: [
      {
        id: 0,
        usage: [5, 10, 15],
        type: '11kW',
        power: 10,
        events: {
          daily: 10,
          weekly: 20,
          monthly: 30,
          yearly: 40,
        },
      },
      {
        id: 1,
        usage: [10, 20, 30],
        type: '11kW',
        power: 10,
        events: {
          daily: 10,
          weekly: 20,
          monthly: 30,
          yearly: 40,
        },
      },
    ],
  };

  it('should format power by hours correctly', () => {
    const result = formatPowerByHours(mockData);
    expect(result).toEqual([
      { xData: '0:00', yData: 10 },
      { xData: '1:00', yData: 20 },
    ]);
  });

  it('should format energy by hours correctly', () => {
    const result = formatEnergyByHours(mockData);
    expect(result).toEqual([
      { xData: '0:00', yData: 5 },
      { xData: '1:00', yData: 15 },
    ]);
  });

  it('should format max usage by points correctly', () => {
    const result = formatMaxUsageByPoints(mockData);
    expect(result).toEqual([
      { xData: '1', yData: 15 },
      { xData: '2', yData: 30 },
    ]);
  });

  it('should format usage per point per hour correctly', () => {
    const result = formatUsagePerPointPerHour(mockData);
    expect(result).toEqual([
      {
        row: 1,
        data: [
          { zData: 5, xData: '0:00', index: 1 },
          { zData: 10, xData: '1:00', index: 1 },
          { zData: 15, xData: '2:00', index: 1 },
        ],
      },
      {
        row: 2,
        data: [
          { zData: 10, xData: '0:00', index: 1 },
          { zData: 20, xData: '1:00', index: 1 },
          { zData: 30, xData: '2:00', index: 1 },
        ],
      },
    ]);
  });
});
