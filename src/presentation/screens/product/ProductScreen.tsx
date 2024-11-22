import { useRef } from 'react';
import {
  ButtonGroup,
  Input,
  Layout,
  Button,
  useTheme,
  Text,
} from '@ui-kitten/components';
import { Formik } from 'formik';

import { MainLayout } from '../../layouts/MainLayout';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';

import { updateCreateProduct, getProductsById } from '../../../actions/products';

import { ScrollView } from 'react-native-gesture-handler';
import { MyIcon } from '../../components/ui/MyIcon';

import { ProductImages } from '../../components/products/ProductImages';
import { Product } from '../../../domain/entities/products';
import { sizes, genders } from '../../../config/constants/product.constants';
import { CameraAdapter } from '../../../config/adapters/camera-adapter';

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> { }

export const ProductScreen = ( { route }: Props ) => {
  const productIdRef = useRef( route.params.productId );
  const theme = useTheme();
  const queryClient = useQueryClient();

  const { data: product } = useQuery( {
    queryKey: [ 'product', productIdRef.current ],
    queryFn: () => getProductsById( productIdRef.current ),
  } );

  const mutation = useMutation( {
    mutationFn: ( data: Product ) =>
      updateCreateProduct( { ...data, id: productIdRef.current } ),
    onSuccess( data: Product ) {
      productIdRef.current = data.id; // creación

      queryClient.invalidateQueries( { queryKey: [ 'products', 'infinite' ] } );
      queryClient.invalidateQueries( { queryKey: [ 'product', data.id ] } );
      // queryClient.setQueryData(['product',  data.id ], data);
    },
  } );

  if ( !product ) {
    return <MainLayout title="Loading..." />;
  }

  return (
    <Formik initialValues={ product } onSubmit={ mutation.mutate }>
      { ( { handleChange, handleSubmit, values, errors, setFieldValue } ) => (
        <MainLayout
          title={ values.title }
          subTitle={ `Precio: ${ values.price }` }
          rightAction={ async () => {
            const photos = await CameraAdapter.takePicture();
            console.log( { photos } );
            setFieldValue( 'images', [ ...values.images, ...photos ] );

          } }
          rightActionIcon="camera-outline"
        >

          <ScrollView style={ { flex: 1 } }>
            {/* product images */ }
            <Layout
              style={ {
                marginVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
              } }>
              <ProductImages images={ values.images } />
            </Layout>

            {/* FORM */ }
            <Layout style={ { marginHorizontal: 10 } }>
              <Input
                label="Title"
                style={ { marginVertical: 5 } }
                value={ values.title }
                onChangeText={ handleChange( 'title' ) }
              />
              <Input
                label="Slug"
                value={ values.slug }
                onChangeText={ handleChange( 'slug' ) }
                style={ { marginVertical: 5 } }
              />
              <Input
                label="Description"
                value={ values.description }
                onChangeText={ handleChange( 'description' ) }
                multiline
                numberOfLines={ 5 }
                style={ { marginVertical: 5 } }
              />
            </Layout>

            {/* Price & Stock */ }
            <Layout
              style={ {
                marginVertical: 5,
                marginHorizontal: 15,
                flexDirection: 'row',
                gap: 10,
              } }>
              <Input
                label="Precio"
                value={ values.price.toString() }
                onChangeText={ handleChange( 'price' ) }
                style={ { flex: 1 } }
                keyboardType="numeric"
              />

              <Input
                label="Inventario"
                value={ values.stock.toString() }
                onChangeText={ handleChange( 'stock' ) }
                style={ { flex: 1 } }
                keyboardType="numeric"
              />
            </Layout>

            {/* Selectores */ }
            <ButtonGroup
              style={ { margin: 2, marginTop: 20, marginHorizontal: 15 } }
              size="small"
              appearance="outline">
              { sizes.map( size => (
                <Button
                  onPress={ () =>
                    setFieldValue(
                      'sizes',
                      values.sizes.includes( size )
                        ? values.sizes.filter( s => s !== size )
                        : [ ...values.sizes, size ],
                    )
                  }
                  key={ size }
                  style={ {
                    flex: 1,
                    backgroundColor: values.sizes.includes( size )
                      ? theme[ 'color-primary-200' ]
                      : undefined,
                  } }>
                  { size }
                </Button>
              ) ) }
            </ButtonGroup>

            <ButtonGroup
              style={ { margin: 2, marginTop: 20, marginHorizontal: 15 } }
              size="small"
              appearance="outline">
              { genders.map( gender => (
                <Button
                  onPress={ () => setFieldValue( 'gender', gender ) }
                  key={ gender }
                  style={ {
                    flex: 1,
                    backgroundColor: values.gender.startsWith( gender )
                      ? theme[ 'color-primary-200' ]
                      : undefined,
                  } }>
                  { gender }
                </Button>
              ) ) }
            </ButtonGroup>

            {/* Save button */ }
            <Button
              accessoryLeft={ <MyIcon name="save-outline" white /> }
              onPress={ () => handleSubmit() }
              disabled={ mutation.isPending }
              style={ { margin: 15 } }>
              Save
            </Button>


            <Text>
              { JSON.stringify( values, null, 2 ) }
            </Text> 
            <Layout style={ { height: 200 } } />
          </ScrollView>
        </MainLayout>
      ) }
    </Formik>
  );
};