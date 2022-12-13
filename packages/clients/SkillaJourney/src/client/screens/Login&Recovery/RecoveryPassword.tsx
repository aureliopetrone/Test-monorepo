import React, { useState } from 'react';
import { Button, SafeAreaView, ScrollView, StatusBar, Text, TextInput, View } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const RecoveryPassword = ({ goToLogin }: { goToLogin: () => void }) => {
  const [recovery_mail, set_recovery_mail] = useState('');
  const [loading, set_loading] = useState(false);
  const [error, set_error] = useState<string>();
  const [success, set_success] = useState<string>();


  return (
    <SafeAreaView>
      <StatusBar
        animated={true}
        barStyle={'light-content'}
      // primaryColor?light-content:'dark-content'
      // showHideTransition={statusBarTransition}
      // hidden={hidden}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: '#fff',
          overflow: 'visible',
        }}>
        <View
          style={{
            flex: 1,
            display: 'flex',
            padding: 32,
            justifyContent: 'center',
          }}>
          <View
            style={{
              paddingBottom: 32,
            }}>
            <Text>Inserisci il tuo username.</Text>
          </View>

          <View style={{ flex: 1 }}>
            <TextInput
              placeholder="Username"
              value={recovery_mail}
              autoCapitalize="none"
              onChangeText={set_recovery_mail}
            />
            <View style={{ marginTop: 32 }}>
              <Button
                onPress={async () => {
                  if (!loading) {
                    set_success(undefined);
                    set_error(undefined);
                    set_loading(true);

                    // try {

                    //   const response = await requestPasswordResetLinkToMail(recovery_mail);

                    //   if (response.exists === false) {
                    //     set_error(response.supportMessage);
                    //   } else {
                    //     if (
                    //       response.exists === true &&
                    //       response.success === true
                    //     ) {
                    //       const messageWithMail =
                    //         response.successMessage.replace(
                    //           '$EMAIL',
                    //           response.emailSent,
                    //         );
                    //       set_success(messageWithMail);
                    //     } else {
                    //       set_error(response.supportMessage);
                    //     }
                    //   }
                    // } catch (err: unknown) {
                    //   if (err instanceof Error) {
                    //     set_error(err.message);
                    //   }
                    // }

                    set_loading(false);
                  }
                }} title="Inizia la procedura di recupero" />
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
                <FontAwesome5
                  name="exclamation-circle"
                  style={{ color: 'white', margin: 16 }}
                  size={16}
                />

              </View>
            ) : null}
            {success ? (
              <View
                style={{
                  marginTop: 32,
                  backgroundColor: 'green',
                  padding: 16,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <FontAwesome5
                  name="exclamation-circle"
                  style={{ color: 'white', margin: 16 }}
                  size={16}
                />
                <View style={{ flex: 1 }}>
                  {/* <HTMLRenderer
                    customStyle={{
                      body: {
                        color: "#ffffff"
                      }
                    }}
                    componentData={{
                      componentId: 'success',
                      source: success,
                      type: "html",
                      order: 0
                    }}
                  /> */}
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecoveryPassword;
