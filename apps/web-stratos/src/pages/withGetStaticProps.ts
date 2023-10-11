import { GetStaticPropsContext } from 'next';
import { UserConfig } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getMetrics } from '@/screens/home/components/tokenomics/queries';

function withGetStaticProps(nextI18NextConfig: UserConfig, ...namespacesRequired: string[]) {
  const namespaceForApp = process.env.NEXT_PUBLIC_APP_NAME ?? '';

  return async ({ locale }: GetStaticPropsContext) => {
    const queryClient = new QueryClient();
    const dehydratedState = dehydrate(queryClient);
    await queryClient.prefetchQuery({ queryKey: ['metrics'], queryFn: getMetrics });
    return {
      props: {
        dehydratedState,
        ...(await serverSideTranslations(
          locale || 'en',
          ['common', namespaceForApp, ...namespacesRequired],
          nextI18NextConfig
        )),
      },
    };
  };
}

export default withGetStaticProps;
