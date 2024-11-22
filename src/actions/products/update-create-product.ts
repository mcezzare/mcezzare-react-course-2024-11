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

const prepareImages = async ( images: string[] ) => {
  // TODO: review files
  const fileImages = images.filter( image => image.includes( 'file://' ) );
  const currentImages = images.filter( image => !image.includes( 'file://' ) );

  if ( fileImages.length > 0 ) {
    const uploadPromises = fileImages.map( image => uploadImage( image ) );
    const uploadImages = await Promise.all( uploadPromises );
    currentImages.push( ...uploadImages );
  }

  return currentImages.map(
    image => image.split( '/' ).pop()
  );


};

const uploadImage = async ( image: string ) => {
  const formData = new FormData();
  formData.append( 'file', {
    uri: image,
    type: 'image/jpeg',
    name: image.split( '/' ).pop,
  } );
  const { data } = await tesloApi.post<{ image: string; }>( '/files/product', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  } );

  return data.image;
};

const updateProduct = async ( product: Partial<Product> ) => {
  const { id, images = [], ...rest } = product;
  const checkedImages = await prepareImages( images );



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
  const checkedImages = await prepareImages( images );

  try {
    // console.log( product );
    // console.log( { checkedImages } );
    const { data } = await tesloApi.post( '/products/', {
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
