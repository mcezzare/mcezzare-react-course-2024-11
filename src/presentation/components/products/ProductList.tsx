import { useState } from 'react';
import { RefreshControl } from 'react-native';
import { Layout, List } from '@ui-kitten/components';
import { useQueryClient } from '@tanstack/react-query';

import { Product } from '../../../domain/entities/products';
import { ProductCard } from './ProductCard';

interface Props {
  products: Product[];
  fetchNextPage: () => void;
  // todo: fetch nextPage
}

export const ProductList = ( { products, fetchNextPage }: Props ) => {
  const queryClient = useQueryClient();
  const [ isRefreshing, setIsRefreshing ] = useState( false );

  const onPullToRefresh = async () => {
    setIsRefreshing( true );
    await new Promise( resolve => setTimeout( resolve, 200 ) );
    queryClient.invalidateQueries( { queryKey: [ 'products', 'infinite' ] } )

    setIsRefreshing( false );
  }

  return (
    <List
      data={ products }
      numColumns={ 2 }
      keyExtractor={ ( item, index ) => `${ item.id }-${ index }` }
      renderItem={ ( { item } ) => (
        <ProductCard product={ item }> { item.title }</ProductCard>
      ) }
      ListFooterComponent={ () => <Layout style={ { height: 150 } } /> }
      onEndReached={ fetchNextPage }
      onEndReachedThreshold={ 0.6 }
      refreshControl={
        <RefreshControl
          refreshing={ isRefreshing }
          onRefresh={ onPullToRefresh }
        />
      }
    />
  );
};
