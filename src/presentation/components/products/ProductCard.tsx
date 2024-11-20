import { Card, Text, useTheme } from '@ui-kitten/components';
import { Product } from '../../../domain/entities/products';
import { Image } from 'react-native';
import { FadeInImage } from '../ui/FadeInImage';


interface Props {
  product: Product;
}

export const ProductCard = ( { product }: Props ) => {

  const theme = useTheme();

  return (
    <Card
      style={ { flex: 1, backgroundColor: '#F9F9F9', margin: 3 } }
    >
      {
        ( product.images.length === 0 )
          ? (
            <Image
              source={ require( '../../../assets/no-product-image.png' ) }
              style={ { width: '100%', height: 200 } }
            /> )
          : (
            <FadeInImage
              uri={ product.images[ 0 ] }
              style={ { flex: 1, height: 200, width: '100%' } }
            />
          )
      }
      <Text
        numberOfLines={ 2 }
        style={ { textAlign: 'center', color: theme[ 'color-primary-default' ] } }
      > { product.title } </Text>
    </Card>




  );
};