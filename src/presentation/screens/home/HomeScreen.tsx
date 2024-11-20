import { Layout, Text } from '@ui-kitten/components';
import { useAuthStore } from '../../store/useAuthStore';
import { getProductsByPage } from '../../../actions/products/get-products-by-page';
import { useQuery } from '@tanstack/react-query';
import { Product } from '../../../domain/entities/products';
import { MainLayout } from '../../layouts/MainLayout';


export const HomeScreen = () => {
  const { logout, user } = useAuthStore();

  const { isLoading, data: products = [] } = useQuery( {
    queryKey: [ 'products', 'infinite' ],
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryFn: () => getProductsByPage( 0 ),

  } );

  return (
    <MainLayout
      title="TesloShop Products"
      subTitle="Admin section"
      rightAction={ () => { } }
      rightActionIcon='plus-outline'
    >
      <Text> Hello { user?.fullName ?? '' }</Text>

    </MainLayout>
  );
};
