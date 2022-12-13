import { useSnapshot } from 'valtio';
import authenticationState from '../state';

/**
 * Authentication hook
 * @returns {Authentication}
 * @example
 * const authentication = useAuthentication();
 * 
 * if (authentication.userCredentials) {
 * // The user is valid
 * } else {
 * // The user is not valid
 * }
 * 	
 **/

export const useAuthentication = ()=>{
	return useSnapshot(authenticationState)
}
