export type FormInputs = {
  chargePoints: number;
  arrivalProbability: number;
  carConsumption: number;
  chargingPower: number;
};

type ChargePoint = {
  id: number;
  type: '11kW' | '22kW' | '50kW';
  power: number;
  usage: number[];
  events: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };
};

export type CalculationData = {
  chargePoints: ChargePoint[];
  totalEnergy: number;
  peakPower: number;
  events: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };
  timeSeries: {
    hour: number;
    power: number;
    energy: number;
    events: number;
  }[];
};

export type BarChartData = {
  xData: string;
  yData: number;
}[];

export type BubbleChartData = {
  row: number;
  data: {
    zData: number;
    xData: string;
    index: number;
  }[];
}[];
