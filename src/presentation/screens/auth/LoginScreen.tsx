import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { ScrollView, useWindowDimensions } from 'react-native';

export const LoginScreen = () => {
  const { height } = useWindowDimensions() 

  return (
    <Layout style={ {
      flex: 1,
    } }>
      <ScrollView style={ { marginHorizontal: 40 } }>

        <Layout style={ { paddingTop: height * 0.35 } }>
          <Text category="h1">Welcome</Text>
          <Text category="p2"> Please, login to continue</Text>
        </Layout>

        {/* Inputs */ }
        <Layout style={ { marginTop: 20 } }>
          <Input
            placeholder="E-mail"
            style={ { marginBottom: 10 } }
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            placeholder="Password"
            style={ { marginBottom: 10 } }
            autoCapitalize="none"
            secureTextEntry
          />
        </Layout>

        {/* Space */ }
        <Layout style={ { height: 20 } } />

        {/* Button */ }
        <Layout>
          <Button
            onPress={ () => console.log( 'click' ) }
          // appearance="ghost"
          >
            enter
          </Button>
        </Layout>

        <Layout style={ { height: 50 } } />

        {/* Create account  */ }

        <Layout style={ {
          alignItems: 'flex-end',
          flexDirection: 'row',
          justifyContent: 'center',
        } }>
          <Text> Don't have an acccount?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={ () => { } }
          > Create acccount</Text>
        </Layout>


      </ScrollView>

    </Layout>
  );
};