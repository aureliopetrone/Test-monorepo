import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { SJText } from '../../../../ui-kit/react/native';
import { Button } from '../../../../ui-kit/react/native/Buttons';

const ChangePassword = ({}) => {
	
	const navigation = useNavigation<StackNavigationProp<any>>();

	return (
		<View style={{padding: 16}}>
			<Button primary onPress={()=>{
				navigation.navigate("SecuritySettings");
			}} title="">
				<SJText textLight center bold>CAMBIA PASSWORD</SJText>
			</Button>
		</View>
	);
};

export default ChangePassword;
