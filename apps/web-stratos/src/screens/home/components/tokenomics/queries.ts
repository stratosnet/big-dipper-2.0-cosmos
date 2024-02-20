import axios from 'axios';

import chainConfig from '@/chainConfig';

const { endpoints } = chainConfig();

export const getMetrics = async () => {
  const result = await axios.get(`${endpoints.rest}/stratos/pot/v1/metrics`);
  return result.data.metrics;
};
