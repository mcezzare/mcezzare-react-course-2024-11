import { Product } from '../../../domain/entities/products';
import { Layout, List } from '@ui-kitten/components';
import { ProductCard } from './ProductCard';
import { useState } from 'react';
import { RefreshControl } from 'react-native';

interface Props {
  products: Product[];
  fetchNextPage: () => void;
  // todo: fetch nextPage
}

export const ProductList = ( { products, fetchNextPage }: Props ) => {

  const [ isRefreshing, setIsRefreshing ] = useState( false );

  const onPullToRefresh = async () => {
    setIsRefreshing( true );
    await new Promise( resolve => setTimeout( resolve, 2000 ) );


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
