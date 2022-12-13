import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../../../../ui-kit/react/native';

const ChangeRecoveyMail = ({}) => {
	
	const navigation = useNavigation<StackNavigationProp<any> | BottomTabNavigationProp<any>>();

	return (
		<View style={{padding: 16}}>
			<Button onPress={()=>{
				navigation.navigate("ChangeRecoveryMailFromSettings");
			}} title="">
				<Text>Cambia mail di recupero</Text>
			</Button>
		</View>
	);
};

export default ChangeRecoveyMail;
