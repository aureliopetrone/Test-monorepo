import React, {useState} from 'react';
import LoginScreen from './LoginScreen';
import RecoveryPassword from './RecoveryPassword';

const Login = () => {
  const [isRecoveryMode, set_isRecoveryMode] = useState(false);

  if (isRecoveryMode) {
    return (
      <RecoveryPassword
        goToLogin={() => {
          set_isRecoveryMode(false);
        }}
      />
    );
  }

  return <LoginScreen goToRecovery={() => set_isRecoveryMode(true)} />;
};

export default Login;
