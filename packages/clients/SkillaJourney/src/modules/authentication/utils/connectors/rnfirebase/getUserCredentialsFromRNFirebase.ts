import auth from '@react-native-firebase/auth';
import { UserCredentials } from '../../interfaces';

/**
 * Get user credentials from RNFirebase
 * @param uid
 * @returns
 * @example
 * import { getUserCredentialsFromRNFirebase } from 'src/app/authentication/connectors/rnfirebase';
 * 
 * getUserCredentialsFromRNFirebase(uid).then((userCredentials) => {
 * // User credentials
 * }
*/

export const getUserCredentialsFromRNFirebase = async (uid: string) => {

  const tokenresult = await auth().currentUser?.getIdTokenResult(true);

  if (!tokenresult?.token) {
    console.log("TOKEN NON VERIFICATO");
    return null;
  }

  const credentials: UserCredentials = {
    user: {
      uid: uid
    },
    token: tokenresult?.token,
    claims: tokenresult?.claims
  }

  return credentials;

};
