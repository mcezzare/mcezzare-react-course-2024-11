import { Layout, Text } from '@ui-kitten/components';
import { Product } from '../../../domain/entities/products';


interface Props {
  product: Product;
}

export const ProductCard = ( { product }: Props ) => {
  return (

    <Layout>

      <Text>{ product.id }</Text>
    </Layout>
  );
};