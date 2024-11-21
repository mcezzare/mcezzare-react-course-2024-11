import { AxiosError } from 'axios';
import { TesloProduct } from '../../infrastructure/interfaces/teslo-products.response';
import { tesloApi } from '../../config/api/tesloApi';
import { ProductMapper } from '../../infrastructure/mappers/product.mapper';
import { Gender, Product } from '../../domain/entities/products';

const emptyProduct: Product = {
  id: '',
  title: 'New product',
  description: '',
  price: 0,
  images: [],
  slug: '',
  gender: Gender.Unisex,
  sizes: [],
  stock: 0,
  tags: [],
}


export const getProductsById = async ( productId: string ): Promise<Product> => {

  if ( productId === 'new' ) {
    return Promise.resolve( emptyProduct );
    // return emptyProduct;
  }


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
