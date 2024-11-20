import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { Alert, ScrollView, useWindowDimensions } from 'react-native';
import { MyIcon } from '../../components/ui/MyIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> { }

export const LoginScreen = ( { navigation }: Props ) => {
  const { login } = useAuthStore();
  const [ isPosting, setIsPosting ] = useState( false );

  const [ form, setForm ] = useState( {
    email: '',
    password: '',
  } );

  const { height } = useWindowDimensions();


  const onLogin = async () => {

    if ( form.email.length === 0 || form.password.length === 0 ) {
      return;
    }
    setIsPosting( true );
    const wasSucessful = await login( form.email, form.password );
    setIsPosting( false );
    if ( wasSucessful ) { return; }

    Alert.alert( 'error', 'User not found' );
  };

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
            accessoryLeft={ <MyIcon name="email-outline" /> }
            style={ { marginBottom: 10 } }
            keyboardType="email-address"
            autoCapitalize="none"
            value={ form.email }
            onChangeText={ ( email ) => setForm( { ...form, email } ) }
            // onChangeText={ value => setForm( { ...form, email: value } ) }
          />
          <Input
            placeholder="Password"
            accessoryLeft={ <MyIcon name="lock-outline" /> }
            style={ { marginBottom: 10 } }
            autoCapitalize="none"
            secureTextEntry
            value={ form.password }
            onChangeText={ ( password ) => setForm( { ...form, password } ) }

          />
        </Layout>
        {/* DUMP : <Text>{ JSON.stringify( form, null, 2 ) }</Text> */ }
        {/* Space */ }
        <Layout style={ { height: 20 } } />

        {/* Button */ }
        <Layout>
          <Button
            disabled={ isPosting }
            accessoryRight={ <MyIcon name="arrow-forward-outline" white /> }
            onPress={ onLogin }
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
            onPress={ () => navigation.navigate( 'RegisterScreen' ) }
          > Create acccount { '' }</Text>
        </Layout>


      </ScrollView>

    </Layout>
  );
};
