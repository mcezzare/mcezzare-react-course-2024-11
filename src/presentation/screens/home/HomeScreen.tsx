/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import { Button, Icon, Layout, Text } from '@ui-kitten/components';

export const HomeScreen = () => {
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
        accessoryLeft={ <Icon name="facebook" /> }
      > Encerrar sessão </Button>
    </Layout>
  );
};
