import database from '@react-native-firebase/database';
import { UserCredentials } from '../../interfaces';

/**
 * Register session from RNFirebase
 * @param userCredentials
 * @param onPermissionRevoked
 * @returns
 * @example
 * import { registerSessionFromRNFirebase } from 'src/app/authentication/connectors/rnfirebase';
 * 
 * registerSessionFromRNFirebase(userCredentials, () => {
 * // Permission revoked
 * }
*/

export const registerSessionFromRNFirebase = async (userCredentials: UserCredentials, onPermissionRevoked: () => void) => {


  database().ref('.info/connected').on('value', async function (snapshot) {
    if (snapshot.val() == false) {
      return;
    };

    try {

      await database().ref(`presence/${userCredentials.user.uid}`).onDisconnect().set({
        state: "offline",
        last_changed: database.ServerValue.TIMESTAMP
      });
      await database().ref(`presence/${userCredentials.user.uid}`).set({
        state: "online",
        last_changed: database.ServerValue.TIMESTAMP
      });

      database().ref(`presence/${userCredentials.user.uid}`).on("value", () => { }, () => {
        database().ref(`presence/${userCredentials.user.uid}`).off("value");
        onPermissionRevoked();
      });


    } catch (error) {
    }


  });

  return () => {
    database().ref(`.info/connected`).off();
    // clearTimeout(timeout);
  };

};
