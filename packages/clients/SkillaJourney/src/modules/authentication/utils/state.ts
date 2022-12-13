import {proxy} from 'valtio';
import { Authentication } from './interfaces';

/**
 * Authentication state
 * @type {Authentication}
 */
const authenticationState = proxy<Authentication>({
  isLoading: true,
  provider: null,
  error: null,
  showLoadingScreen: true,
  webEnabled: false,
  userCredentials: null
});

export default authenticationState
