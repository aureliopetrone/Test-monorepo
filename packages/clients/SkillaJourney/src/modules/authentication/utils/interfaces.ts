/**
 * Authentication
 * @property isLoading - If the authentication is loading
 * @property provider - Authentication provider
 * @property error - Authentication error
 * @property showLoadingScreen - If the loading screen should be shown
 * @property webEnabled - If the web is enabled
 * @property userCredentials - User credentials
**/
export interface Authentication {
  isLoading: boolean;
  provider: "rnfirebase" | "firebase" | null,
  error: null | Error;
  showLoadingScreen: boolean;
  webEnabled: boolean;
  userCredentials: UserCredentials | null
}



/**
 * User
 * @property uid - User id
**/
export type User = {
  uid: string;
}



/**
 * User credentials
 * @property token - User token
 * @property claims - User claims
 * @property user - User
**/
export type UserCredentials = {
  token: string;
  claims: any;
  user: User;
}



/**
 * Password reset request response
 * @property supportMessage - Support message
 * @property emailSent - Email sent message
 * @property successMessage - Success message
 * @property exists - If the user exists
 * @property success - If the request was successful
**/
export type PasswordResetRequestResponse = {
  supportMessage: string;
  emailSent: string;
  successMessage: string;
  exists: boolean;
  success: boolean;
}



/**
 * Authentication provider
 * @property signIn - Function to sign in
 * @property signOut - Function to sign out
 * @property onUserCredentialsChange - Function to listen to user credentials changes
 * @property registerSession - Function to register a session
 * @property requestPasswordResetLinkToMail - Function to request a password reset link to mail
 **/
export type AuthProvider = {
  signIn: (email: string, password: string) => Promise<UserCredentials | null>;
  signOut: () => Promise<void>;
  onUserCredentialsChange: (callback: (userCredentials: UserCredentials | null) => void) => () => void;
  registerSession: (userCredentials: UserCredentials, onPermissionRevoked: () => void) => Promise<() => void>;
  requestPasswordResetLinkToMail: (email: string) => Promise<PasswordResetRequestResponse>;
  reauthenticateWithEmail: (password: string) => Promise<UserCredentials | null>;
}



/**
 * Authentication settings
 * @property provider - Authentication provider
**/
export type AuthSettings = {
  provider: AuthProvider | null
}



/**
 * Multifactor authentication error
 * @property sendCode - Function to send the code
 * @property code - Error code
 * @property message - Error message
 **/
export type MultifactorAuthError = {
	sendCode: () => Promise<(verificationCode: string) => Promise<UserCredentials | null>>,
	code: string,
	message: string
}