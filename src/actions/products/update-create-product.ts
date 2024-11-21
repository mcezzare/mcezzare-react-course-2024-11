import { AxiosError } from 'axios';
import { tesloApi } from '../../config/api/tesloApi';
import { Product } from '../../domain/entities/products';
import { TesloProduct } from '../../infrastructure/interfaces/teslo-products.response';


export const updateCreateProduct = ( product: Partial<Product> ) => {

  product.stock = Number( product.stock );
  product.price = Number( product.price );


  if ( product.id && product.id !== 'new' ) {
    return updateProduct( product );
  }

  return createProduct( product );




};

const prepareImages = ( images: string[] ) => {
  // TODO: review files
  return images.map(
    image => image.split( '/' ).pop()
  );


};

// TODO: review if comes an user
const updateProduct = async ( product: Partial<Product> ) => {
  const { id, images = [], ...rest } = product;
  const checkedImages = prepareImages( images );

  try {
    console.log( product );

    console.log( { checkedImages } );
    const { data } = await tesloApi.patch( `/products/${ id }`, {
      images: checkedImages,
      ...rest,
    } );
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
      throw new Error( `Error updating product : ${ product.id } ` );

    }
  }


};

const createProduct = async ( product: Partial<Product> ): Promise<Product> => {

  const { id, images = [], ...rest } = product;
  const checkedImages = prepareImages( images );

  try {
    // console.log( product );
    // console.log( { checkedImages } );
    const { data } = await tesloApi.post( `/products/`, {
      images: checkedImages,
      ...rest,
    } );

    return data;

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
      throw new Error( `Error creating product : ${ product.id } ` );

    }
  }
};
