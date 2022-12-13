import React, {useRef} from 'react';
import {
  NavigationContainer,
  Route,
  useNavigationContainerRef,
} from '@react-navigation/native';

import {Button, Text, View} from 'react-native';
import AppWithAuthentication from './AppWithAuthentication';
import { signOut } from './../modules/authentication';

const ReactApp = () => {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<Route<any>>();

  
  return (
    <NavigationContainer
      ref={navigationRef}
      >
        <AppWithAuthentication>
          <View style={{ padding: 64}}>
          <Text>Logged in</Text>
          <Button title='Logout' onPress={signOut} />
          </View>
        
        </AppWithAuthentication>
    </NavigationContainer>
  );
};

export default ReactApp;