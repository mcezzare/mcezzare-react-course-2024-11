import { useNavigation } from '@react-navigation/native';
import { Divider, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MyIcon } from '../components/ui/MyIcon';


interface Props {
  title: string;
  subTitle?: string;

  rightActions?: {
    icon: string;
    onPress: () => void;
  }[];

  // rightAction?: () => void;
  // rightActionIcon?: string;

  children: React.ReactNode;


}

export const MainLayout = ( { title, subTitle, rightActions, children }: Props ) => {

  const { top } = useSafeAreaInsets();
  const { canGoBack, goBack } = useNavigation();

  const renderBackAction = () => (
    <TopNavigationAction
      icon={ <MyIcon name="arrow-back-outline" /> }
      onPress={ goBack }

    />
  );

  // const RenderRightAction = () => {

  //   if ( rightAction === undefined || rightActionIcon === undefined ) return null;

  //   return (
  //     <TopNavigationAction
  //       onPress={ rightAction }
  //       icon={ <MyIcon name={ rightActionIcon } /> }
  //     />
  //   );
  // };

  const RenderRightActions = () => {
    if ( !rightActions || rightActions.length === 0 ) return null;

    return rightActions.map( ( action, index ) => (
      <TopNavigationAction
        key={ index }
        onPress={ action.onPress }
        icon={ <MyIcon name={ action.icon } /> }
      />
    ) );
  };

  return (
    <Layout style={ { paddingTop: top } }>
      <TopNavigation
        title={ title }
        subtitle={ subTitle }
        alignment="center"
        accessoryLeft={ canGoBack() ? renderBackAction : undefined }
        accessoryRight={ () => <RenderRightActions /> }
      />
      <Divider />
      <Layout style={ { height: '100%' } }>
        { children }
      </Layout>


    </Layout>
  );
};