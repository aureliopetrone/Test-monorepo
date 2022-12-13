import React, { useState } from 'react';
import { Text } from 'react-native';
import { Pressable, View } from 'react-native';
import { SeconfFactorForm } from './SeconfFactorForm';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { UserCredentials } from 'src/modules/authentication';

export const SecondFactorScreen = ({ goBackToFirstFactorScreen, verifyCodeFun }: { goBackToFirstFactorScreen: () => void, verifyCodeFun?: (code:string) => Promise<UserCredentials | null> }) => {

  const [isLoading, setLoading] = useState<boolean>(false);
  return <View
    style={{
      flex: 1,
      display: 'flex',
      padding: 32,
    }}
  >
    <View
      style={{
        paddingBottom: 32,
      }}>
      <Pressable onPress={goBackToFirstFactorScreen} style={{
        paddingTop: 32,
        paddingBottom: 32,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      }}>
        <FontAwesome5Icon name='chevron-left' />
        <Text > Torna alla schermata precedente</Text>
      </Pressable>

      <SeconfFactorForm isLoading={isLoading} setLoading={setLoading} verifyCodeFun={verifyCodeFun} />

    </View>
  </View>;
};


