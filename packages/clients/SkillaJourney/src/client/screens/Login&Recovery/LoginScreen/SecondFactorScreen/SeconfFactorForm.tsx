import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { UserCredentials } from 'src/modules/authentication';

export function SeconfFactorForm({
  isLoading,
  verifyCodeFun,
  setLoading
}: {
  isLoading: boolean;
  verifyCodeFun?: ((code:string) => Promise<UserCredentials | null>),
  setLoading: (arg0: boolean) => void;
}) {

  console.log("CCC")

  const [verificationCode, set_verificationCode] = useState<string>();

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      throw new Error("Inserisci un codice valido");
    }

    if (!verifyCodeFun) {
      throw new Error("Missing verificationCode or multiFactorResolver");
    }

    setLoading(true);

    await verifyCodeFun(verificationCode);
    setLoading(false);

  }


  return (<View>

    <Text>Per continuare inserisci il codice di verifica che hai ricevuto via SMS</Text>
    
    <View style={{ marginTop: 32, marginBottom: 32}}>
    <TextInput autoCorrect={false} placeholder="Codice di verifica" value={verificationCode} autoCapitalize="none" onChangeText={text => {
      set_verificationCode(text);
    }} />
    </View>
    

    <Button onPress={handleVerifyCode} title="Conferma" />

  </View>);
}
