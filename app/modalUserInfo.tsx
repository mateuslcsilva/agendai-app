import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import React from 'react'
import Colors from '@/constants/Colors'
import { router } from 'expo-router';

const modalUserInfo = () => {
	const logOut = async() => {
		await SecureStore.deleteItemAsync('userId');
		router.replace('/');
	}
	return (
		<View style={styles.container}>
			<Text>modalUserInfo</Text>
			<TouchableNativeFeedback onPress={logOut}>
				<Text style={styles.button}>Deslogar</Text>
			</TouchableNativeFeedback>
		</View>
	)
}

export default modalUserInfo

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.lightThemeBackground.backgroundColor,
		justifyContent: 'center',
		alignItems: 'center'
	},
	button: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 7,
		backgroundColor: Colors.primaryFontColor.color,
		fontSize: 24,
		marginTop: 12
	},
})