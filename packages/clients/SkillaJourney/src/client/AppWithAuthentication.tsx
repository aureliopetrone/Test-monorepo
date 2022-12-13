import React from 'react';
import Login from './screens/Login&Recovery';


import {useAuthentication, initAuthenticationModule} from '../modules/authentication/';
import RNAuthProvider from '../modules/authentication/utils/connectors/rnfirebase'

initAuthenticationModule({
  provider: RNAuthProvider
});


const AppWithAuthentication = (props:any) => {
  
  const { isLoading, userCredentials} = useAuthentication();

  console.log("AppWithAuthentication", isLoading, userCredentials?.user?.uid)


  if (isLoading) {
    return null;
  }

  if (!userCredentials?.user?.uid) {
    return <Login />;
  }

  return <>{props.children}</>;
};

export default AppWithAuthentication;
