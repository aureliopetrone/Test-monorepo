/* eslint-disable react-native/no-inline-styles */
import React, { ReactNode } from 'react';
import {Text, TextProps, TextStyle} from 'react-native';

export interface SJTextStylePropsT extends TextProps {
	primary?: boolean;
	secondary?: boolean;
	underline?: boolean;
	italic?: boolean;
	center?: boolean;
	bold?: boolean;
	textGray?: boolean;
	textLight?: boolean;
	small?: boolean;
	style?: TextStyle;
	h2?: boolean;
	onPress?: ()=> void,
	adjustsFontSizeToFit?: boolean
} 

export const SJText: React.FC<React.PropsWithChildren<{ style?: TextStyle, children: ReactNode | string } & SJTextStylePropsT>> = ({
	children, 
	adjustsFontSizeToFit, 
	style, 
	bold,
	small,
	italic,
	center,
	underline,
	primary,
	secondary,
	textGray,
	textLight,
	h2,
	...props
}) => {
	return (
		<Text
			style={{
				fontSize: small ? 14 : 16,
				fontWeight: bold ? 'bold' : 'normal',
				...(italic && {fontStyle: 'italic'}),
				...(center && {textAlign: 'center'}),
				...(underline && {textDecorationLine: 'underline'}),
				...(h2 && { fontSize: 22}),
				...style
			}}
			{...props} {...(adjustsFontSizeToFit ? { adjustsFontSizeToFit: true } : {})}>
			{children}
		</Text>
	);
};