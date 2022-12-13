import React from 'react';
import {
  View,
  Text
} from 'react-native';

export const AppRooted = () => {
  return <View style={{
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <Text style={{
      color: "#fff"
    }}> Attenzione, dispositivo non sicuro. </Text></View>;
};
