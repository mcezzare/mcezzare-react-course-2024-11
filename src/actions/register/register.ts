import { AxiosError } from 'axios';
import { tesloApi } from '../../config/api/tesloApi';
import { AuthResponse } from '../../infrastructure/interfaces/auth.responses';
import { authLogin } from '../auth/auth';

export const registerUser = async ( fullName: string, email: string, password: string ) => {

  email = email.toLowerCase();

  try {

    const payload = {
      email: email,
      password: password,
      fullName: fullName,
    };

    console.log( 'Request Payload:', payload );

    const { data } = await tesloApi.post<AuthResponse>( '/auth/register', payload );

    console.log( 'Response Data:', data );

    if ( data.isActive ) {
      return await authLogin( email, password );
    }

  } catch ( error ) {
    if ( error instanceof AxiosError ) {
      console.error( 'Error Message:', error.message );

      // Dump all errors
      if ( error.response ) {
        console.error( 'Response Status:', error.response.status );
        console.error( 'Response Data:', error.response.data );
      }
    } else {
      console.error( 'Unexpected Error:', error );
    }
    return null;
  }
};
