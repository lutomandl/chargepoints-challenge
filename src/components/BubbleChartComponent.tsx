import {
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import { BubbleChartData } from '../types/types';

interface BubbleChartComponentProps {
  data: BubbleChartData;
  unit: string;
  color?: string;
}

export default function BubbleChartComponent({
  data,
  unit,
  color = '#2B7FFF',
}: BubbleChartComponentProps) {
  const domain = [0, 100];
  const range = [20, 300];

  return (
    <>
      {data.map((item) => {
        return (
          <ResponsiveContainer width="100%" height={60}>
            <ScatterChart
              margin={{
                top: 10,
                right: 10,
                bottom: 0,
                left: 10,
              }}
            >
              <XAxis
                allowDecimals={false}
                dataKey="xData"
                tick={{ fontSize: item.row === data.length ? 12 : 0 }}
                tickLine={{ transform: 'translate(0, -6)' }}
              />
              <YAxis
                type="number"
                dataKey="index"
                name={item.row.toString()}
                height={10}
                width={50}
                tick={false}
                tickLine={false}
                axisLine={false}
                label={{
                  value: item.row.toString(),
                  position: 'insideRight',
                }}
              />
              <ZAxis
                type="number"
                dataKey="zData"
                unit={unit}
                name="value"
                domain={domain}
                range={range}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                wrapperStyle={{ zIndex: 100 }}
              />
              <Scatter data={item.data} fill={color} />
            </ScatterChart>
          </ResponsiveContainer>
        );
      })}
    </>
  );
}
