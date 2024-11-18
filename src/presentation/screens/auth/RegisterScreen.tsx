import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { ScrollView, useWindowDimensions } from 'react-native';
import { MyIcon } from '../../components/ui/MyIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> { }

export const RegisterScreen = ( { navigation }: Props ) => {
  const { height } = useWindowDimensions();

  return (
    <Layout style={ {
      flex: 1,
    } }>
      <ScrollView style={ { marginHorizontal: 40 } }>

        <Layout style={ { paddingTop: height * 0.30 } }>
          <Text category="h1">Create Account</Text>
          <Text category="p2"> Please, create an account  to continue</Text>
        </Layout>

        {/* Inputs */ }
        <Layout style={ { marginTop: 20 } }>
          <Input
            placeholder="Complete name"
            accessoryLeft={ <MyIcon name="person-outline" /> }
            style={ { marginBottom: 10 } }
            keyboardType="name-phone-pad"
            autoCapitalize="none"
          />
          <Input
            placeholder="E-mail"
            accessoryLeft={ <MyIcon name="email-outline" /> }
            style={ { marginBottom: 10 } }
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            placeholder="Password"
            accessoryLeft={ <MyIcon name="lock-outline" /> }
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
            accessoryRight={ <MyIcon name="arrow-forward-outline" white /> }
            onPress={ () => console.log( 'click' ) }
          // appearance="ghost"
          >
            Create Account
          </Button>
        </Layout>

        <Layout style={ { height: 50 } } />

        {/* Create account  */ }

        <Layout style={ {
          alignItems: 'flex-end',
          flexDirection: 'row',
          justifyContent: 'center',
        } }>
          <Text> Already have an acccount?</Text>
          <Text
            status="primary"
            category="s1"
            // navigation.popTo( 'LoginScreen' )
            onPress={ () => navigation.goBack() }
          > enter { '' }</Text>
        </Layout>

        <Layout style={ { height: 50 } } />
      </ScrollView>

    </Layout>
  );
};