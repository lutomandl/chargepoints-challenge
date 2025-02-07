import { CalculationData } from '../types/types';
import StatisticsCard from './StatisticsCard';
import refresh from '../assets/refresh.svg';
import {
  formatEnergyByHours,
  formatMaxUsageByPoints,
  formatPowerByHours,
  formatUsagePerPointPerHour,
} from '../utils/formatChartData';
import BarChartComponent from './BarChartComponent';
import BubbleChartComponent from './BubbleChartComponent';
import ev from '../assets/ev-graphic2.svg';
import ChartWrapper from './ChartWrapper';

interface OutputViewProps {
  resetCalculation: () => void;
  calculationResults: CalculationData;
}

export default function OutputView({
  resetCalculation,
  calculationResults,
}: OutputViewProps) {
  return (
    <article className="mt-8 flex flex-col items-center w-full">
      <h2>Calculation Results</h2>
      <img
        src={ev}
        alt="ilustration of electric car"
        width={500}
        height={500}
      />
      <button onClick={resetCalculation}>
        <img src={refresh} alt="refresh" className="w-4 h-4 inline mr-2" />
        Restart
      </button>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-8 items-center">
        <StatisticsCard
          title="Total Energy"
          value={calculationResults.totalEnergy}
          unit="kWh"
        />
        <StatisticsCard
          title="Peak Power"
          value={calculationResults.peakPower}
          unit={'kW'}
        />
        <StatisticsCard
          title="Daily Events"
          value={calculationResults.events.daily}
          unit="events"
        />
        <StatisticsCard
          title="Monthly Events"
          value={calculationResults.events.monthly}
          unit="events"
        />
      </section>
      <section className="flex flex-col gap-8 w-full">
        <ChartWrapper title="Power by hours">
          <BarChartComponent
            data={formatPowerByHours(calculationResults)}
            unit=" kW"
          />
        </ChartWrapper>
        <ChartWrapper title="Energy by hours">
          <BarChartComponent
            data={formatEnergyByHours(calculationResults)}
            unit=" kWh"
            color="#f6ad55"
          />
        </ChartWrapper>
        <ChartWrapper title="Max Usage by Points">
          <BarChartComponent
            data={formatMaxUsageByPoints(calculationResults)}
            unit=" %"
            color="#e23d3d"
          />
        </ChartWrapper>
        <ChartWrapper title="Usage of points per hour">
          <BubbleChartComponent
            data={formatUsagePerPointPerHour(calculationResults)}
            unit=" kWh"
          />
        </ChartWrapper>
      </section>
    </article>
  );
}
