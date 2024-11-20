import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { useAuthStore } from '../../store/useAuthStore';
import { getProductsByPage } from '../../../actions/products/get-products-by-page';


export const HomeScreen = () => {
  const { logout, user } = useAuthStore();
  getProductsByPage( 1, 10 );

  return (
    <Layout
      style={ {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      } }
    >

      <Text style={ { fontSize: 30 } }>Hello { user?.fullName ?? '' }</Text>


      <Button
        accessoryLeft={ <Icon name="log-out-outline" /> }
        onPress={ logout }
      > Encerrar sessão </Button>
    </Layout>
  );
};
