import { STAGE, API_URL as PROD_URL, API_URL_IOS, API_URL_ANDROID } from '@env';
import axios, { AxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';
import { StorageAdapter } from '../storage/storage-adapter';

export const API_URL =
  STAGE === 'prod'
    ? PROD_URL
    : Platform.OS === 'ios'
      ? API_URL_IOS
      : API_URL_ANDROID;

const tesloApi = axios.create( {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
} );

// Generate curl command
const generateCurlCommand = ( config: AxiosRequestConfig ): string => {
  const { method, url, headers, data, baseURL } = config;
  let curl = `curl -X ${ method?.toUpperCase() } '${ baseURL }${ url }'`;

  // Add headers to curl
  if ( headers ) {
    for ( const [ key, value ] of Object.entries( headers ) ) {
      curl += ` -H '${ key }: ${ value }'`;
    }
  }

  // Add body to request, if exists
  if ( data ) {
    curl += ` -d '${ typeof data === 'string' ? data : JSON.stringify( data ) }'`;
  }

  return curl;
};

// Interceptors
tesloApi.interceptors.request.use(
  async ( config ) => {
    // Add token to headers, if exists
    const token = await StorageAdapter.getItem( 'token' );
    if ( token ) {
      config.headers[ 'Authorization' ] = `Bearer ${ token }`;
    }

    // Log curl \o/
    console.debug( 'Request CURL:', generateCurlCommand( config ) );

    return config;
  },
  ( error ) => {
    return Promise.reject( error );
  }
);

export { tesloApi };
