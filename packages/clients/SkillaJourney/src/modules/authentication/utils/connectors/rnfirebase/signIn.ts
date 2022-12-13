import auth from '@react-native-firebase/auth';
import { MultifactorAuthError, UserCredentials } from '../../interfaces';

/**
 * Sign in
 * @param email
 * @param password
 * @returns
 * @example
 * import { signIn } from 'src/app/authentication/connectors/rnfirebase';
 * 
 * signIn(email, password).then((userCredentials) => {
 * // User credentials
 * }
 * 
 * @throws {MultifactorAuthError} - If the user has enabled multifactor authentication a function to send the code is returned, that function must be called with the code
 * @throws {Error}
 */
export async function signIn(email: string, password: string) {

	email = email.trim();
	const validateEmail = (email: string) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	if (!validateEmail(email)) {
		email = email + '@digitaljourney.app';
	}

	try {

		const userCredentialsFromRNFirebase = await auth().signInWithEmailAndPassword(email, password);
		const tokenResults = await userCredentialsFromRNFirebase.user?.getIdTokenResult()

		if (!tokenResults?.token) {
			console.log('token non verificato');
			return null;
		}

		return {
			user: userCredentialsFromRNFirebase.user,
			token: tokenResults.token,
			claims: tokenResults.claims
		} as UserCredentials

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
