import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { BarChartData } from '../types/types';

interface BarChartComponentProps {
  data: BarChartData;
  unit?: string;
  color?: string;
}

export default function BarChartComponent({
  data,
  unit,
  color = '#2B7FFF',
}: BarChartComponentProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="xData" allowDecimals={false} />
        <YAxis unit={unit} />
        <Tooltip />
        <Bar dataKey="yData" name="value" unit={unit} fill={color} />
      </BarChart>
    </ResponsiveContainer>
  );
}
