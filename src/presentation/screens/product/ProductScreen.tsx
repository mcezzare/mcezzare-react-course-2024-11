import { Text } from '@ui-kitten/components';
import { MainLayout } from '../../layouts/MainLayout';
import { getProductsById } from '../../../actions/products/get-product-by-id';
import { useQuery } from '@tanstack/react-query';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useRef } from 'react';

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> { }

export const ProductScreen = ( { route }: Props ) => {
  const productIdRef = useRef( route.params.productId );

  // console.log( route.productId );
  // useQuery
  // useMutation
  const { data: product } = useQuery( {
    queryKey: [ 'products', productIdRef.current ],
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryFn: () => getProductsById( productIdRef.current ),

  } );

  if ( !product ) {
    return ( <MainLayout title=" Loading..." /> );
  }


  return (
    <MainLayout
      title={ product.title }
      subTitle={ product.price }
    >
      <Text>Product Screen</Text>

    </MainLayout>
  );
};