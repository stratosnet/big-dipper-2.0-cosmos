import { useId, FC } from 'react';

import { Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';

interface ITokenomicChart {
  data?: any[];
}

const TokenomicChart: FC<ITokenomicChart> = ({ data }) => {
  const chartId = useId();

  return (
    <BarChart width={600} height={250} data={data} id={chartId}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="legendKey" />
      <YAxis tickCount={10_000} domain={[0, 'dataMax']} tick={{ fontSize: 12 }} />
      <Tooltip />
      <Bar dataKey="value" isAnimationActive={false} />
    </BarChart>
  );
};

export default TokenomicChart;
