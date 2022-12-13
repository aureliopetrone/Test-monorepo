import firebase from '@react-native-firebase/app';
import '@react-native-firebase/functions';
import { PasswordResetRequestResponse } from '../../interfaces';

/**
 * Request password reset link to mail
 * @param username
 * @returns Promise<PasswordResetRequestResponse>
 * @example
 * import { requestPasswordResetLinkToMail } from 'src/app/authentication/connectors/rnfirebase';
 * 
 * requestPasswordResetLinkToMail(username).then((response) => {
 * // Link sent
 * }
*/
export function requestPasswordResetLinkToMail(username: string) {
	const functionRef = firebase.app().functions('europe-west1').httpsCallable('requestPasswordResetLinkToMail');
	return functionRef({ username }).then(( response ) => {
		return response.data as PasswordResetRequestResponse
	});
}
