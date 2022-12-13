import auth from '@react-native-firebase/auth';
import { getUserCredentialsFromRNFirebase } from './getUserCredentialsFromRNFirebase';
import { UserCredentials } from '../../interfaces';

/**
 * Listen to authentication state changes
 * @param callback
 * @returns
 * @example
 * onUserCredentialsChange((userCredentials) => {
 *  if (userCredentials) {
 *   // The user is valid
 * } else {
 *  // The user is not valid
 * }
 * })
*/
export const onUserCredentialsChange = (callback: (userCredentials: UserCredentials | null) => void) => {

  let first = true;
  const unsbscribe = auth().onAuthStateChanged(async (firebaseuser) => {

    if (first && firebaseuser !== null) {
      first = false;
      return;
    }else{
      first = false;
    }

    if (firebaseuser) {
      // 1.1 - Is the user valid?
      const userCredentials = await getUserCredentialsFromRNFirebase(firebaseuser.uid);
      callback(userCredentials);
      return
    }

    callback(null);
    return null;

  });

  return unsbscribe;

};
