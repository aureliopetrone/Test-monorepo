import * as React from 'react'
import { Button, NativeModules, StyleSheet, Text, View } from 'react-native'

/**
 * Authentication module
 * @module authentication
 * @example
 * import { initAuthenticationModule } from './authentication';
 * import { rnfirebaseAuthenticationProvider } from './authentication/connectors/rnfirebase';
 * 
 * const closeAuthenticationModule = await initAuthenticationModule({
 * provider: rnfirebaseAuthenticationProvider
 * })
 * 
 * // Use the authentication module
 * import authenticationState from './authentication/state';
 * import { useAuthentication } from './authentication/ui/hooks';
 * 
 * const authentication = useAuthentication();
 * 
 * if (authentication.userCredentials) {
 * // The user is valid
 * } else {
 * // The user is not valid
 * }
 * 
 * // Close the authentication module
 * closeAuthenticationModule();
**/

import authenticationState from './utils/state';
import { AuthSettings, AuthProvider } from './utils/interfaces';

/**
 * Authentication settings
*/
const settings: AuthSettings = {
  provider: null
}

/**
 * Initialize the authentication module
 * @param provider
 * @returns
 * @example
 * const closeAuthenticationModule = await initAuthenticationModule({
 * provider: rnfirebaseAuthenticationProvider
 * })
 *  */
export const initAuthenticationModule = async ({
  provider
}: {
  provider: AuthProvider
}) => {

  settings.provider = provider;
  let unsubscribeFrmomSession: (() => void) | null = null;

  // 1.0 - Listen to authentication state changes
  const unsbscribe = provider.onUserCredentialsChange(async (userCredentials) => {


    // 1.1 - Is the user valid?
    if (userCredentials) {
      // 1.1.1 - The user is valid
      authenticationState.userCredentials = userCredentials;
      authenticationState.error = null;

      // 1.1.2 - Register the session
      unsubscribeFrmomSession = await provider.registerSession?.(userCredentials, () => {

        // On Revocation this happens, the user is not valid
        authenticationState.userCredentials = null;

        // Close the local session
        provider.signOut();
        unsubscribeFrmomSession = null;

        // Set the error
        authenticationState.error = new Error("Permission revoked");
      });

      // 1.1.3 - Auth is ready
      authenticationState.isLoading = false;

    } else {
      // 1.2.1 - The user is not valid
      authenticationState.userCredentials = null;

      // 1.2.2 - Unsubscribe from the session
      if (unsubscribeFrmomSession) {
        unsubscribeFrmomSession();
        unsubscribeFrmomSession = null;
      }

      // 1.2.3 - Auth is ready
      authenticationState.isLoading = false;

      // 1.2.4 - Set the error
      authenticationState.error = null;
    }

  });

  /*
  * 2.0 - Return a function to close the authentication module
  */
  return () => {
    unsbscribe();
    unsubscribeFrmomSession && unsubscribeFrmomSession();
  }

}

/**
 * Sign in
 * @param email
 * @param password
 * @returns Promise<UserCredentials>
 * @example
 * const userCredentials = await signIn(email, password)
 * @throws MultifactorAuthError - If the user has enabled multifactor authentication a function to send the code is returned, that function must be called with the code
 * 
**/
export const signIn = (username: string, password: string) => {
  if (!settings.provider?.signIn) {
    throw new Error("Not implemented")
  }

  return settings.provider.signIn(username, password);
};

export type { MultifactorAuthError } from './utils/interfaces' 

/**
 * Sign out
 * @returns
 * @example
 * await signOut()
 *  
 * */
export const signOut = () => {
  if (!settings.provider?.signOut) {
    throw new Error("Not implemented")
  }
  return settings.provider.signOut();
};

/**
 * Request a password reset link to mail
 * @param email
 * @returns Promise<PasswordResetRequestResponse>
 * @example
 * await requestPasswordResetLinkToMail(email).then((response) => {
 * // Link sent
 * }).catch((error) => {
 * // Error
 * })
 * 
*/
export const requestPasswordResetLinkToMail = async (email: string) => {
  if (!settings.provider?.requestPasswordResetLinkToMail) {
    throw new Error("Not implemented")
  }
  return settings.provider.requestPasswordResetLinkToMail(email);
};


export const reauthenticateWithEmail = async (password: string) => {
  if (!settings.provider?.reauthenticateWithEmail) {
    throw new Error("Not implemented")
  }
  return settings.provider.reauthenticateWithEmail(password);
};

// Path: utils/app/authentication/ui/hooks.ts
export { useAuthentication } from './utils/ui/hooks';
export type {UserCredentials} from './utils/interfaces';



export default NativeModules.SJAuthRNModule
