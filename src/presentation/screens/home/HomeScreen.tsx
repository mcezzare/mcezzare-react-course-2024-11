import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { useAuthStore } from '../../store/useAuthStore';

export const HomeScreen = () => {
  const { logout } = useAuthStore();


  return (
    <Layout
      style={ {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      } }
    >

      <Text style={ { fontSize: 30 } }>HomeScreen</Text>


      <Button
        accessoryLeft={ <Icon name="log-out-outline" /> }
        onPress={ logout }
      > Encerrar sessão </Button>
    </Layout>
  );
};
