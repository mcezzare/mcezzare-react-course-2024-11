import { AxiosError } from 'axios';
import { TesloProduct } from '../../infrastructure/interfaces/teslo-products.response';
import { tesloApi } from '../../config/api/tesloApi';
import { ProductMapper } from '../../infrastructure/mappers/product.mapper';
import { Product } from '../../domain/entities/products';

export const getProductsByPage = async ( page: number, limit: number = 20 ): Promise<Product[]> => {
  try {
    console.log( { page, limit } );

    const { data } = await tesloApi.get<TesloProduct[]>( `/products?limit=${ limit }&offset=${ page * 10 }` );
    // console.log( data );
    const products = data.map( ProductMapper.tesloProductToEntity );
    // const products = data.map( tesloProduct => ProductMapper.tesloProductToEntity( tesloProduct ) );
    console.log( products[ 0 ] );
    return products;

  } catch ( error ) {
    if ( error instanceof AxiosError ) {
      console.log( 'Error Message:', error.message );

      // Dump all errors
      if ( error.response ) {
        console.log( 'Response Status:', error.response.status );
        console.log( 'Response Data:', error.response.data );
      }
    } else {
      console.log( 'Unexpected Error:', error );
      throw new Error( 'Error getting products' );

    }
  }
};
