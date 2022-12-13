import React, { useCallback, useState } from 'react';
import {
  Button,
  Text, TextInput,
  View
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { MultifactorAuthError, signIn, UserCredentials } from '../../../../modules/authentication'

export const FirstFactorScreen = ({ goToRecovery, goToSecondFactorScreen }: { goToRecovery: () => void; goToSecondFactorScreen: ({ verifyCode }: { verifyCode: (code: string) => Promise<UserCredentials | null> }) => void }) => {

  const [isLoading, set_isLoading] = useState(false);
  const [error, set_error] = useState('');
  const [username, set_username] = useState('');
  const [password, set_password] = useState('');

  const handleSignIn = useCallback(async (username: string, password: string) => {
    set_isLoading(true);
    try {
      await signIn(username, password);
    } catch (error: any) {

      const { code } = error;

      if (code === 'auth/multi-factor-auth-required') {

        const multiFactorError = error as MultifactorAuthError

        try {
          const verifyCode = await multiFactorError.sendCode();
          goToSecondFactorScreen({ verifyCode })

        } catch (error) {
          console.error(error)
        }

        return;
      } else {
        set_error(error.message || false);
      }
    }

    set_isLoading(false);
  }, [isLoading, username, password]);


  return <View
    style={{
      flex: 1,
      display: 'flex',
      padding: 32,
      justifyContent: 'center',
    }}>
   

    <View style={{ flex: 1, maxHeight: 32022 }}>
      <View style={{}}>
        <TextInput
          autoComplete="username"
          autoCorrect={false}
          textContentType="username"
          placeholder="Username"
          value={username}
          autoCapitalize="none"
          onChangeText={text => {
            set_username(text);
          }} />
      </View>

      <View style={{ marginTop: 16 }}>
        <TextInput
          autoComplete="password"
          autoCorrect={false}
          textContentType="password"
          placeholder="Password"
          value={password}
          onChangeText={set_password}
          secureTextEntry={true} />
      </View>

      <View style={{ marginTop: 32 }}>
        <Button
          onPress={() => handleSignIn(username, password)}
          title="Accedi"
        />
      </View>

      {error ? (
        <View
          style={{
            marginTop: 32,
            backgroundColor: 'red',
            padding: 16,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Text>
            <FontAwesome5Icon
              name="exclamation-circle"
              style={{ color: 'white', margin: 16 }}
              size={16} />
            {error}
          </Text>
        </View>
      ) : null}
    </View>
  </View>;
};
