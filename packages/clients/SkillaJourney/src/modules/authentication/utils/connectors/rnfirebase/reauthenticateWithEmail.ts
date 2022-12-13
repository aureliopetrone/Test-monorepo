import authenticationState from '../../state';
import auth from '@react-native-firebase/auth';
import { MultifactorAuthError } from '../../..';


/**
 * Reauthenticate with email and password
 * @param password
 * @returns {Promise<Error | firebase.auth.UserCredential>}
 * @example
 * import { reauthenticateWithEmail } from 'src/app/authentication/';
 * 
 * reauthenticateWithEmail(password).then((response) => {
 * // Signed in
 * }
*/
export async function reauthenticateWithEmail(password: string) {

	const user = auth().currentUser;
	if (!user) {
		throw new Error("USER_INVALIDATED");
	}

	if (user?.email === null) {
		throw new Error("No email associated with this account");
	}

	const credentials = auth.EmailAuthProvider.credential(user?.email, password);

	try {
		const userCredentials = await user.reauthenticateWithCredential(credentials);
		const tokenResults = await user.getIdTokenResult();
		authenticationState.userCredentials = {
			user: {
				uid: user.uid
			},
			token: tokenResults.token,
			claims: tokenResults.claims
		};
		return {
			user: {
				uid: user.uid
			},
			token: tokenResults.token,
			claims: tokenResults.claims
		};
	} catch (error: any) {
		if (error.code === 'auth/multi-factor-auth-required') {
			const resolver = auth().getMultiFactorResolver(error);
			if (resolver.hints[0].factorId === auth.PhoneMultiFactorGenerator.FACTOR_ID) {

				const hint = resolver.hints[0];
				const sessionId = resolver.session;

				throw ({
					sendCode: async () => {
						const verificationId = await auth().verifyPhoneNumberWithMultiFactorInfo(hint, sessionId)
						return async (verificationCode: string) => {

							console.log('verifyCode', verificationCode, verificationId);
	
							const credential = auth.PhoneAuthProvider.credential(verificationId, verificationCode);
							const multiFactorAssertion = auth.PhoneMultiFactorGenerator.assertion(credential);
							const userCredentials =  await resolver.resolveSignIn(multiFactorAssertion);
							const tokenResults = await userCredentials.user?.getIdTokenResult()
	
							if(!tokenResults) {
								console.log('token non verificato');
								return null;
							}
	
							return {
								user: userCredentials.user,
								token: tokenResults?.token,
								claims: tokenResults?.claims
							}
						}
					},
					code: 'auth/multi-factor-auth-required',
					message: 'Multi factor auth required'
				}) as MultifactorAuthError

			} else {
				throw new Error('Multi factor auth required, but second factor is not supported');
			}
		}

		throw error;
	}
}
