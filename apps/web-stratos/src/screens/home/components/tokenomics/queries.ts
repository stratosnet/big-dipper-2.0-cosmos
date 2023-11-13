import axios from 'axios';

import chainConfig from '@/chainConfig';

const { endpoints } = chainConfig();

export const getMetrics = async () => {
  const result = await axios.get(`${endpoints.rest}/pot/metrics`);
  return result.data.result;
};
