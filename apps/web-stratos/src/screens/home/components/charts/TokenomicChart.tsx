import { useId, FC } from 'react';

import { BigNumber } from 'ethers';

import { Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';

interface ITokenomicChart {
  total: string;
  data?: any[];
}

const TokenomicChart: FC<ITokenomicChart> = ({ data, total }) => {
  const chartId = useId();

  return (
    <BarChart
      width={600}
      height={250}
      data={data}
      id={chartId}
      {...{
        overflow: 'visible',
      }}
    >
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="legendKey" />
      <YAxis scale="log" tick={{ fontSize: 12 }} domain={[1_00, total]} />
      <Tooltip />
      <Bar dataKey="value" isAnimationActive={false} />
    </BarChart>
  );
};

export default TokenomicChart;
