import { AxiosError } from 'axios';
import { TesloProduct } from '../../infrastructure/interfaces/teslo-products.response';
import { tesloApi } from '../../config/api/tesloApi';
import { ProductMapper } from '../../infrastructure/mappers/product.mapper';
import { Product } from '../../domain/entities/products';

export const getProductsById = async ( productId: string ): Promise<Product> => {
  try {

    const { data } = await tesloApi.get<TesloProduct>( `/products/${ productId }` );
    return ProductMapper.tesloProductToEntity( data );

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
      throw new Error( `Error getting product : ${ productId } ` );

    }
  }
};
