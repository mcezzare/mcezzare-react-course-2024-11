import 'react-native-gesture-handler';

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { useColorScheme } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AuthProvider } from './presentation/providers/AuthProvider';

export const ProductsApp = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;
  const backgroundColor = ( colorScheme === 'dark' )
    ? theme[ 'color-basic-800' ] //'#222B45' 
    : theme[ 'color-basic-100' ]; // '#F7F9FC';
  return (
    <>
      <IconRegistry icons={ EvaIconsPack } />
      <ApplicationProvider { ...eva } theme={ theme }>
        <NavigationContainer theme={ {
          dark: colorScheme === 'dark',
          colors: {
            primary: theme[ 'color-primary-500' ],
            background: backgroundColor,
            card: theme[ 'color-basic-100' ],
            text: theme[ 'text-basic-color' ],
            border: theme[ 'color-basic-800' ],
            notification: theme[ 'color-basic-500' ],
          }
        } }>
          <AuthProvider>
          <StackNavigator />
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>

    </>
  );
};
