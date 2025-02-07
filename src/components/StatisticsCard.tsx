interface StatisticsCardProps {
  title: string;
  value: number;
  unit: string;
}

export default function StatisticsCard({
  title,
  value,
  unit,
}: StatisticsCardProps) {
  return (
    <div className="p-5 flex flex-col gap-2 text-center border border-gray-300 rounded-lg w-full">
      <h3>{title}</h3>
      <p className="text-3xl font-black text-blue-500">{value.toFixed(2)}</p>
      <p className="text-gray-500 text-sm">{unit}</p>
    </div>
  );
}
