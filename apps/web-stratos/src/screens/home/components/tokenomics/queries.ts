import axios from 'axios';

export const getMetrics = async () => {
  const result = await axios.get(`${process.env.NEXT_PUBLIC_REST_CHAIN_ENDPOINT}/pot/metrics`);
  return result.data.result;
};
