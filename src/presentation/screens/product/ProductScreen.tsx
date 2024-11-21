import { Button, ButtonGroup, Input, Layout, Text, useTheme } from '@ui-kitten/components';
import { MainLayout } from '../../layouts/MainLayout';
import { getProductsById } from '../../../actions/products/get-product-by-id';
import { useQuery } from '@tanstack/react-query';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import React, { useRef } from 'react';
import { FlatList } from 'react-native';
import { FadeInImage } from '../../components/ui/FadeInImage';
import { ScrollView } from 'react-native-gesture-handler';
import { Gender, Size } from '../../../domain/entities/products';
import { MyIcon } from '../../components/ui/MyIcon';
import { Formik } from 'formik';

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> { }

export const ProductScreen = ( { route }: Props ) => {
  const productIdRef = useRef( route.params.productId );
  const theme = useTheme();
  // console.log( route.productId );
  // useQuery
  // useMutation
  const { data: product } = useQuery( {
    queryKey: [ 'products', productIdRef.current ],
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryFn: () => getProductsById( productIdRef.current ),

  } );

  if ( !product ) {
    return ( <MainLayout title=" Loading..." /> );
  }

  // list to components multi choice
  const sizes: Size[] = [ Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl ];

  const genders: Gender[] = [ Gender.Kid, Gender.Men, Gender.Unisex, Gender.Women ];

  return (
    <Formik
      initialValues={ product }
      onSubmit={ values => console.log( values ) }
    >
      {
        ( { handleChange, handleSubmit, values, errors, setFieldValue } ) => (
          <MainLayout
            title={ values.title }
            subTitle={ `Price : ${ values.price }` }
          >
            <ScrollView style={ { flex: 1 } }>

              {/* /Images */ }
              {/* / TODO: fix when no images */ }
              <Layout>
                <FlatList
                  data={ values.images }
                  keyExtractor={ ( item ) => item }
                  horizontal
                  showsHorizontalScrollIndicator={ false }
                  renderItem={ ( { item } ) => (
                    <FadeInImage
                      uri={ item }
                      style={ { width: 300, height: 300, marginHorizontal: 8 } }
                    />
                  ) }


                />

                {/* /Forms */ }


                <Layout style={ { marginHorizontal: 10 } }>
                  <Input
                    label="Title"
                    value={ values.title }
                    style={ { marginVertical: 5 } }
                    onChangeText={ handleChange( 'title' ) }
                  />
                  <Input
                    label="SLUG"
                    value={ values.slug }
                    style={ { marginVertical: 5 } }
                    onChangeText={ handleChange( 'slug' ) }
                  />
                  <Input
                    label="Description"
                    multiline
                    numberOfLines={ 5 }
                    value={ values.description }
                    style={ { marginVertical: 5 } }
                    onChangeText={ handleChange( 'description' ) }
                  />
                </Layout>

                {/* Price and Stock */ }
                <Layout style={ { marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', gap: 10 } }>

                  <Input
                    label="Price"
                    value={ values.price.toString() }
                    style={ { marginVertical: 5, flex: 1 } }
                    onChangeText={ handleChange( 'price' ) }
                  />

                  <Input
                    label="Inventory"
                    value={ values.stock.toString() }
                    style={ { marginVertical: 5, flex: 1 } }
                    onChangeText={ handleChange( 'stock' ) }
                  />
                </Layout>

                {/* Selectors */ }
                <Layout>
                  <Text
                    style={ {
                      margin: 2,
                      marginTop: 5,
                      marginHorizontal: 15,
                      fontWeight: 'bold',
                    }
                    }>Sizes</Text>
                  {/* Sizes */ }
                  <ButtonGroup
                    style={ { margin: 2, marginTop: 15, marginHorizontal: 5 } }
                    size="small"
                    appearance="outline"
                  >
                    {
                      sizes.map( ( size, index ) => (
                        <Button
                          onPress={ () => setFieldValue(
                            'sizes',
                            values.sizes.includes( size )
                              ? values.sizes.filter( s => s !== size )
                              : [ ...values.sizes, size ]
                          ) }
                          key={ size }
                          style={ {
                            flex: 1,
                            backgroundColor: values.sizes.includes( size )
                              ? theme[ 'color-primary-200' ]
                              : undefined,
                          } }
                        >{ size }


                        </Button>
                      ) )
                    }

                  </ButtonGroup>



                  {/* Gender */ }
                  <Text
                    style={ {
                      margin: 2,
                      marginTop: 5,
                      marginHorizontal: 15,
                      fontWeight: 'bold'
                    }
                    }>Genders</Text>

                  <ButtonGroup
                    style={ { margin: 2, marginTop: 16, marginHorizontal: 5 } }
                    size="small"
                    appearance="outline"
                  >
                    {
                      genders.map( ( gender, index ) => (
                        <Button
                          onPress={ () => setFieldValue( 'gender', gender ) }
                          key={ gender }
                          style={ {
                            flex: 1,
                            backgroundColor: values.gender.startsWith( gender )
                              ? theme[ 'color-primary-200' ]
                              : undefined,
                          } }
                        >{ gender }


                        </Button>
                      ) )
                    }

                  </ButtonGroup>


                  {/* Save Button */ }
                  <Button
                    onPress={ () => console.log( 'Save tap' ) }
                    style={ {
                      marginTop: 24,
                      margin: 8
                    } }
                    accessoryLeft={ <MyIcon name='save-outline' white /> }
                  >Save item
                  </Button>

                </Layout>

                <Text>{ JSON.stringify( values, null, 2 ) }</Text>

              </Layout>
              {/* Fix ios bottom inacessible    */ }
              <Layout style={ { height: 200 } } />

            </ScrollView>

          </MainLayout>

        )
      }
    </Formik>
  );
};