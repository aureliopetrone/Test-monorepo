/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './src/client';
import { name as appName } from './app.json';
import JailMonkey from 'jail-monkey'
import { AppRooted } from './AppRooted';
import { initOneSignal } from './initOneSignal';

import './polyfills';
import 'react-native-gesture-handler';


const ALLOW_JAILBROKEN_DEVICES = false;

const AppTest = ()=>{
  return <Text>Test</Text>
}


if ( Boolean(ALLOW_JAILBROKEN_DEVICES) ) {
  initOneSignal();
  AppRegistry.registerComponent(appName, () => App);
}else{
  if( JailMonkey.isJailBroken() ){
    AppRegistry.registerComponent(appName, () => AppRooted);
  }else{
    AppRegistry.registerComponent(appName, () => App);
  }
}

