import { AxiosError } from 'axios';
import { tesloApi } from '../../config/api/tesloApi';
import { AuthResponse } from '../../infrastructure/interfaces/auth.responses';
import { authLogin } from '../auth/auth';

export const registerUser = async ( fullName: string, email: string, password: string ) => {

  email = email.toLowerCase();

  try {

    let payload = JSON.stringify( {
      'email': email,
      'password': password,
      'fullName': fullName,
    } );
    console.log( payload );

    const { data } = await tesloApi.post<AuthResponse>( '/auth/register', {
      data: payload,
    } );

    console.log( data );

    if ( data.isActive ) {
      return await authLogin( email, password );

    }


    // return returnUserToken( data );

  } catch ( error ) {
    if ( error instanceof AxiosError ) {
      console.log( error.message );
    }
    console.log( error );
    return null;
  }
};
