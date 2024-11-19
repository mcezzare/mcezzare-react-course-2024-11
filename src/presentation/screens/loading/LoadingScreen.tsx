import { Layout, Spinner } from '@ui-kitten/components';


export const LoadingScreen = () => {
  return (
    <Layout
      style={ {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      } }
    >
      <Spinner
        status="primary"
        size="large"
      />
    </Layout>
  );
};
