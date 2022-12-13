import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { SecondFactorScreen } from './SecondFactorScreen';
import { FirstFactorScreen } from './FirstFactorScreen';
import { UserCredentials } from 'src/modules/authentication';


const LoginScreen = ({ goToRecovery }: { goToRecovery: () => void }) => {

  const [verifyCodeFun, set_verifyCodeFun] = useState<(code:string) => Promise<UserCredentials | null>>()
  const [screen, set_screen] = useState<string>("FIRST");


  const goBackToFirstFactorScreen = () => {
    set_verifyCodeFun(undefined)
    set_screen("FIRST")
  }

  const goToSecondFactorScreen = ({ verifyCode } : { verifyCode?: (code:string) => Promise<UserCredentials | null> }) => {
    console.log("AAA")
    if(verifyCode){
    //   console.log("BBB")
      set_verifyCodeFun(()=>verifyCode)
      set_screen("SECOND")
    }else{
      throw new Error("verifyCode is undefined")
    }
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          flexGrow: 1,
          overflow: 'visible',
        }}>

        {
          screen === "SECOND" ? <SecondFactorScreen goBackToFirstFactorScreen={goBackToFirstFactorScreen} verifyCodeFun={verifyCodeFun}  /> : null
        }

        {
          screen === "FIRST" ? <FirstFactorScreen goToRecovery={goToRecovery} goToSecondFactorScreen={goToSecondFactorScreen} /> : null
        }

      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
