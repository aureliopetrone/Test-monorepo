import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

/**
 * Sign out and close the session
 * @returns {Promise<void>}
 * @example
 * import { signOut } from 'src/app/authentication/connectors/rnfirebase';
 * 
 * signOut().then(() => {
 * // Signed out
 * }
*/
export async function signOut() {
	const currentUser = auth().currentUser;
	if (currentUser) {

		return new Promise((resolve, reject) => {

			database().ref(`presence/${currentUser.uid}`).set({
				state: "offline",
				last_changed: database.ServerValue.TIMESTAMP
			}, (error) => {
				if (error) {
					reject(error);
				}
				resolve(auth().signOut());
			});

		})
	}
}
