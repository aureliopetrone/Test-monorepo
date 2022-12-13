import React from 'react';
import { View } from 'react-native';
import { Button, SJText } from '../../../../ui-kit/react/native';


const LogOut = ({signOut}: any) => {
	

	return (
		<View style={{padding: 16}}>
			<Button onPress={signOut} title="">
				<SJText bold center textLight>SignOut</SJText>
			</Button>
		</View>
	);
};

export default LogOut;
