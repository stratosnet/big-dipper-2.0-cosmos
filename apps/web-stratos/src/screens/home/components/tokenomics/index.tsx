import { FC } from 'react';
import numeral from 'numeral';
import dynamic from 'next/dynamic';

import chainConfig from '@/chainConfig';
import Box from '@/components/box';
import { useTokenomics } from '@/screens/home/components/tokenomics/hooks';
import useStyles from '@/screens/home/components/tokenomics/styles';
import Typography from '@mui/material/Typography';
import useAppTranslation from '@/hooks/useAppTranslation';
import { prettyFormat } from './utils';

const { tokenUnits } = chainConfig();

const TokenomicChart = dynamic(() => import('../charts/TokenomicChart'), { ssr: false });

const Tokenomics: FC<ComponentDefault> = ({ className }) => {
  const { t } = useAppTranslation('home');
  const { classes, cx, theme } = useStyles();
  const { data: tokenomics, isLoading } = useTokenomics();

  if (isLoading || !tokenomics) return null;

  const data = [
    {
      legendKey: t('bonded'),
      percentKey: 'bondedPercent',
      value: prettyFormat(tokenomics.bonded, 18, 2),
      percent: `${prettyFormat(tokenomics.bonded.mul(1_000_000).div(tokenomics.total), 4, 6)}%`,
      fill: theme.palette.custom.tokenomics.one,
    },
    {
      legendKey: t('toBeMined'),
      percentKey: 'toBeMinedPercent',
      value: prettyFormat(tokenomics.toBeMined, 18, 2),
      percent: `${prettyFormat(tokenomics.toBeMined.mul(1_000_000).div(tokenomics.total), 4, 6)}%`,
      fill: theme.palette.custom.tokenomics.two,
    },
    {
      legendKey: t('deposit'),
      percentKey: 'depositPercent',
      value: prettyFormat(tokenomics.resourceNodesDeposit, 18, 2),
      percent: `${prettyFormat(
        tokenomics.resourceNodesDeposit.mul(1_000_000).div(tokenomics.total),
        4,
        6
      )}%`,
      fill: theme.palette.custom.tokenomics.three,
    },
    {
      legendKey: t('unbonded'),
      percentKey: 'unbondedPercent',
      value: prettyFormat(tokenomics.unbonded, 18, 2),
      percent: `${prettyFormat(tokenomics.unbonded.mul(1_000_000).div(tokenomics.total), 4, 6)}%`,
      fill: theme.palette.custom.tokenomics.four,
    },
    {
      legendKey: t('circulationSupply'),
      percentKey: 'circulationSupplyPercent',
      value: prettyFormat(tokenomics.circulationSupply, 18, 2),
      percent: `${prettyFormat(
        tokenomics.circulationSupply.mul(1_000_000).div(tokenomics.total),
        4,
        6
      )}%`,
      fill: theme.palette.custom.tokenomics.five,
    },
  ];

  return (
    <Box className={cx(classes.root, className)}>
      <Typography variant="h2" className={classes.label}>
        {t('tokenomics')}
      </Typography>
      <div className={classes.data}>
        {data.map((x) => (
          <div className="data__item" key={x.percentKey}>
            <Typography variant="h4">
              {x.value.toLocaleString()} {tokenUnits?.wei?.display?.toUpperCase()}
            </Typography>
            <Typography variant="caption">
              {x.percentKey
                ? t(x.percentKey, {
                    percent: x.percent,
                  })
                : ''}
            </Typography>
          </div>
        ))}
      </div>
      <div className={classes.content}>
        <TokenomicChart data={data} />
      </div>
    </Box>
  );
};

export default Tokenomics;
