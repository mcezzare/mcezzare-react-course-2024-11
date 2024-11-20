import { Text } from '@ui-kitten/components';
import { useAuthStore } from '../../store/useAuthStore';
import { getProductsByPage } from '../../../actions/products/get-products-by-page';
import { useQuery } from '@tanstack/react-query';
import { MainLayout } from '../../layouts/MainLayout';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { ProductList } from '../../components/products/ProductList';


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
      {
        isLoading
          ? ( <FullScreenLoader /> )
          : <ProductList products={ products } />
      }


    </MainLayout>
  );
};
