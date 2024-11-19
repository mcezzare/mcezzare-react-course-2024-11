import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { Alert, ScrollView, useWindowDimensions } from 'react-native';
import { MyIcon } from '../../components/ui/MyIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useState } from 'react';
import { registerUser } from '../../../actions/register/register';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> { }

export const RegisterScreen = ( { navigation }: Props ) => {
  const { height } = useWindowDimensions();
  const [ isPosting, setIsPosting ] = useState( false );

  const [ form, setForm ] = useState( {
    fullName: '',
    email: '',
    password: '',
  } );

  const onRegister = async () => {

    if ( form.email.length === 0 || form.password.length === 0 || form.fullName.length === 0 ) {
      return;
    }

    setIsPosting( true );
    const wasSucessful = await registerUser( form.fullName, form.email, form.password );
    console.log( wasSucessful );
    setIsPosting( false );
    if ( wasSucessful ) {
      navigation.navigate( 'HomeScreen' );
    } else {
      Alert.alert( 'error', 'Cant create user' );
    }

  };

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
            value={ form.fullName }
            onChangeText={ ( fullName ) => setForm( { ...form, fullName } ) }
          />
          <Input
            placeholder="E-mail"
            accessoryLeft={ <MyIcon name="email-outline" /> }
            style={ { marginBottom: 10 } }
            keyboardType="email-address"
            autoCapitalize="none"
            value={ form.email }
            onChangeText={ ( email ) => setForm( { ...form, email } ) }

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

        {/* Space */ }
        <Layout style={ { height: 20 } } />

        {/* Button */ }
        <Layout>
          <Button
            accessoryRight={ <MyIcon name="arrow-forward-outline" white /> }
            // onPress={ () => console.log( 'click' ) }
            onPress={ onRegister }

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



        <Text>{ JSON.stringify( form, null, 2 ) }</Text>  
        <Layout style={ { height: 50 } } />
      </ScrollView>

    </Layout>
  );
};