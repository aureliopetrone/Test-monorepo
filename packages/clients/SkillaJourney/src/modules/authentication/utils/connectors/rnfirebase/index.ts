import { signIn } from "./signIn"
import { signOut } from "./signOut"
import { onUserCredentialsChange } from "./onUserCredentialsChange"
import { registerSessionFromRNFirebase } from "./registerSessionFromRNFirebase"
import { AuthProvider } from "../../interfaces"
import { requestPasswordResetLinkToMail } from "./requestPasswordResetLinkToMail"
import { reauthenticateWithEmail } from "./reauthenticateWithEmail"

/**
 * Authentication provider
 * @property signIn - Function to sign in
 * @property signOut - Function to sign out
 * @property onUserCredentialsChange - Function to listen to user credentials changes
 * @property registerSession - Function to register a session
 * @property requestPasswordResetLinkToMail - Function to request a password reset link to mail
 * */
export default {
    signIn,
    signOut,
    onUserCredentialsChange,
    registerSession: registerSessionFromRNFirebase,
    requestPasswordResetLinkToMail,
    reauthenticateWithEmail
} as AuthProvider