interface ChartWrapperProps {
  title: string;
  children: React.ReactNode;
}

export default function ChartWrapper({ title, children }: ChartWrapperProps) {
  return (
    <div className="w-full h-80 md:w-4xl md:m-12 md:h-96">
      <h3>{title}</h3>
      {children}
    </div>
  );
}
